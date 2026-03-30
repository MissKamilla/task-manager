import { tasks } from '@/data/mockData';
import type { Task } from '@/types/entities';
import type {
  CreateTaskRequest,
  GetTasksResponse,
  UpdateTaskRequest,
} from '@/shared/api/types';
import { TASKS_STORAGE_KEY } from '../constants/task';

export function getInitialTasks(): Task[] {
  const storageTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  if (storageTasks) {
    try {
      const parseTasks = JSON.parse(storageTasks);
      if (Array.isArray(parseTasks)) {
        return parseTasks;
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      return [...tasks];
    }
  }
  return [...tasks];
}
let tasksDb = getInitialTasks();

export function saveTasksToStorage(tasks: Task[]): void {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

export async function getTasks(): Promise<GetTasksResponse> {
  await delay();
  // throw new Error('Test error');
  return tasksDb;
}

export async function createTask(data: CreateTaskRequest): Promise<Task> {
  await delay();
  const newTask = { ...data, id: `task-${Date.now()}`, projectId: 'project-1' };

  tasksDb = [...tasksDb, newTask];
  saveTasksToStorage(tasksDb);

  return newTask;
}

export async function updateTask(
  id: Task['id'],
  data: UpdateTaskRequest,
): Promise<Task> {
  await delay();
  const foundTask = tasksDb.find((task) => task.id === id);

  if (!foundTask) {
    throw new Error(`Task with id ${id} is not found`);
  }

  const updatedTask = { ...foundTask, ...data };

  tasksDb = tasksDb.map((task) => {
    if (task.id === updatedTask.id) {
      return updatedTask;
    }
    return task;
  });
  saveTasksToStorage(tasksDb);

  return updatedTask;
}

export async function deleteTask(id: Task['id']): Promise<void> {
  await delay();

  if (!tasksDb.some((task) => task.id === id)) {
    throw new Error(`Task with id ${id} is not found`);
  }
  tasksDb = tasksDb.filter((task) => task.id !== id);
  saveTasksToStorage(tasksDb);
}

function delay(ms: number = 1000): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}
