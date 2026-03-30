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
  const [tasks, setTasks] = useState<Task[]>([]);

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

  async function fetchTasks() {
    setTasksError('');
    setIsTasksLoading(true);
    try {
      const taskList = await getTasks();
      setTasks(taskList);
    } catch (error) {
      setTasksError(
        getErrorMessage(error, 'Something went wrong while loading tasks'),
      );
    } finally {
      setIsTasksLoading(false);
    }
  }
  useEffect(() => {
    fetchTasks();
  }, []);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const visibleTasks = tasks
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
    if (isTaskSubmitting) return;
    setTasksError('');
    setIsTaskSubmitting(true);

    try {
      await createTask(formValues);
      await fetchTasks();

      setIsCreateModalOpen(false);
    } catch (error) {
      setTasksError(
        getErrorMessage(error, 'Something went wrong while creating the task'),
      );
    } finally {
      setIsTaskSubmitting(false);
    }
  };

  const handleEditTask = async (formValues: TaskFormValues) => {
    if (!editingTask) return;
    if (isTaskSubmitting) return;
    setTasksError('');
    setIsTaskSubmitting(true);

    try {
      await updateTask(editingTask.id, formValues);
      await fetchTasks();

      setEditingTask(null);
    } catch (error) {
      setTasksError(
        getErrorMessage(error, 'Something went wrong while updating the task'),
      );
    } finally {
      setIsTaskSubmitting(false);
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = async (taskId: Task['id']) => {
    setTasksError('');
    try {
      await deleteTask(taskId);
      await fetchTasks();
    } catch (error) {
      setTasksError(
        getErrorMessage(error, 'Something went wrong while deleting the task'),
      );
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
            <button type="button" onClick={fetchTasks} className="create-btn">
              Retry
            </button>
          </>
        ) : tasks.length === 0 ? (
          <p>No tasks yet. Create your first task.</p>
        ) : visibleTasks.length === 0 ? (
          <p>No tasks match your search or filters.</p>
        ) : (
          <TaskList
            tasks={visibleTasks}
            onEditTask={handleEditClick}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </Layout>
    </>
  );
}

export default App;
