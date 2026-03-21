import '@/styles/App.css';

import { tasks, users } from '@/data/mockData';
import { TaskList } from '@/components/TaskList';
import { Layout } from '@/components/Layout';
import { FilterPanel } from '@/components/FilterPanel';
import { TaskForm } from '@/components/TaskForm';
import { useEffect, useState } from 'react';
import type { FilterStatus, Task, TaskFormValues } from '@/types/entities';
import { Modal } from '@/components/Modal';
import { TASK_SORT, type TaskSort } from './shared/constants/task';

const TASKS_STORAGE_KEY = 'task-manager-tasks';

function App() {
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);

    if (!storedTasks) return tasks;
    try {
      const parsedTasks = JSON.parse(storedTasks);

      if (Array.isArray(parsedTasks)) {
        return parsedTasks as Task[];
      }
      return tasks;
    } catch {
      return tasks;
    }
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>('all');
  const [selectedSort, setSelectedSort] = useState<TaskSort>('default');

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

  const handleSaveTask = (formValues: TaskFormValues) => {
    if (editingTask) {
      setTaskList((prev) =>
        prev.map((task) => {
          if (task.id === editingTask.id)
            return {
              ...formValues,
              id: editingTask.id,
              projectId: editingTask.projectId,
            };
          return task;
        }),
      );
      setEditingTask(null);
    } else {
      const newTask = {
        ...formValues,
        id: `task-${Date.now()}`,
        projectId: 'project-1',
      };

      setTaskList((prev) => [newTask, ...prev]);
    }

    setIsCreateModalOpen(false);
  };

  const handleStartEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskList((prev) => prev.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskList));
  }, [taskList]);

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
            <TaskForm mode="create" users={users} onSaveTask={handleSaveTask} />
          </Modal>
        )}

        {editingTask && (
          <Modal onClose={() => setEditingTask(null)}>
            <TaskForm
              mode="edit"
              users={users}
              onSaveTask={handleSaveTask}
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

        <TaskList
          tasks={filteredTasks}
          onEditTask={handleStartEdit}
          onDeleteTask={handleDeleteTask}
        />
      </Layout>
    </>
  );
}

export default App;
