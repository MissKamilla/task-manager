import '@/styles/App.css';

import { users } from '@/data/mockData';
import { TaskList } from '@/components/TaskList';
import { Layout } from '@/components/Layout';
import { FilterPanel } from '@/components/FilterPanel';
import { TaskForm } from '@/components/TaskForm';
import { useEffect, useState } from 'react';
import type { FilterStatus, Task, TaskFormValues } from '@/types/entities';
import { Modal } from '@/components/Modal';
import { TASK_SORT, type TaskSort } from '@/shared/constants/task';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from './shared/api/tasksApi';

function App() {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const [isTasksLoading, setIsTasksLoading] = useState<boolean>(false);
  const [isTaskSubmitting, setIsTaskSubmitting] = useState<boolean>(false);
  const [tasksError, setTasksError] = useState<string>('');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>('all');
  const [selectedSort, setSelectedSort] = useState<TaskSort>('default');

  const getErrorMessage = (error: unknown, fallbackMessage: string): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return fallbackMessage;
  };

  async function loadTasks() {
    setTasksError('');
    setIsTasksLoading(true);
    try {
      const tasks = await getTasks();
      setTaskList(tasks);
    } catch (error) {
      setTasksError(getErrorMessage(error, 'Something wrong with getTasks'));
    } finally {
      setIsTasksLoading(false);
    }
  }
  useEffect(() => {
    loadTasks();
  }, []);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredTasks = taskList
    .filter((task) => {
      const matchesStatus =
        selectedStatus === 'all' || task.status === selectedStatus;

      const matchesSearch =
        normalizedSearchQuery === '' ||
        task.title.toLowerCase().includes(normalizedSearchQuery) ||
        task.description.toLowerCase().includes(normalizedSearchQuery);

      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case TASK_SORT.TITLE_ASC:
          return a.title.localeCompare(b.title);
        case TASK_SORT.TITLE_DESC:
          return b.title.localeCompare(a.title);
        case TASK_SORT.DEFAULT:
        default:
          return 0;
      }
    });

  const handleCreateTask = async (formValues: TaskFormValues) => {
    setTasksError('');
    if (isTaskSubmitting) return;
    setIsTaskSubmitting(true);

    try {
      await createTask(formValues);
      await loadTasks();

      setIsCreateModalOpen(false);
    } catch (error) {
      setTasksError(getErrorMessage(error, 'Something wrong with create task'));
    } finally {
      setIsTaskSubmitting(false);
    }
  };

  const handleEditTask = async (formValues: TaskFormValues) => {
    if (editingTask) {
      if (isTaskSubmitting) return;
      setIsTaskSubmitting(true);

      setTasksError('');
      try {
        await updateTask(editingTask.id, formValues);
        await loadTasks();

        setEditingTask(null);
      } catch (error) {
        setTasksError(getErrorMessage(error, 'Something wrong with edit task'));
      } finally {
        setIsTaskSubmitting(false);
      }
    }
  };

  const handleStartEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = async (taskId: Task['id']) => {
    setTasksError('');
    try {
      await deleteTask(taskId);
      await loadTasks();
    } catch (error) {
      setTasksError(getErrorMessage(error, 'Something wrong with delete'));
    }
  };

  return (
    <>
      <Layout>
        <FilterPanel
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
        />
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="create-btn"
        >
          Create task
        </button>
        {isCreateModalOpen && (
          <Modal onClose={() => setIsCreateModalOpen(false)}>
            <TaskForm
              mode="create"
              users={users}
              onSaveTask={handleCreateTask}
              isSubmitting={isTaskSubmitting}
            />
          </Modal>
        )}

        {editingTask && (
          <Modal onClose={() => setEditingTask(null)}>
            <TaskForm
              mode="edit"
              users={users}
              onSaveTask={handleEditTask}
              isSubmitting={isTaskSubmitting}
              initialValues={{
                title: editingTask.title,
                description: editingTask.description,
                status: editingTask.status,
                priority: editingTask.priority,
                assigneeId: editingTask.assigneeId,
              }}
            />
          </Modal>
        )}

        {isTasksLoading ? (
          <p>Loading tasks...</p>
        ) : tasksError !== '' ? (
          <>
            <p>{tasksError}</p>
            <button type="button" onClick={loadTasks} className="create-btn">
              Retry
            </button>
          </>
        ) : taskList.length === 0 ? (
          <p>No tasks yet</p>
        ) : filteredTasks.length === 0 ? (
          <p>Nothing found</p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEditTask={handleStartEdit}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </Layout>
    </>
  );
}

export default App;
