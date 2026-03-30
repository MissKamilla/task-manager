import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '@/shared/api/tasksApi';
import type { GetTasksResponse } from '@/shared/api/types';
import { TASK_PRIORITY, TASK_STATUS } from '@/shared/constants/task';
import type { TaskFormValues } from '@/types/entities';
import { useEffect, /*useRef,*/ useState } from 'react';

const createTaskData: TaskFormValues = {
  title: 'Test create Task',
  description: 'Test create Task',
  status: TASK_STATUS.BACKLOG,
  assigneeId: 'user-1',
  priority: TASK_PRIORITY.HIGH,
};

export function TasksApiPractice() {
  const [apiTasks, setApiTasks] = useState<GetTasksResponse>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [lastLoadedFrom, setLastLoadedFrom] = useState('');
  // const latestRequestIdRef = useRef(0); // для тестирования ignore stale response.

  const executeRequest = async (func: () => Promise<void>) => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      await func();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTasks = async (
    // requestId: number,
    label?: string,
  ) => {
    const updatedTasksList = await getTasks();

    // if (requestId !== latestRequestIdRef.current) return;

    setApiTasks(updatedTasksList);
    setLastLoadedFrom(label ?? '');
  };

  const handleLoadTasks = async (label?: string) => {
    //   latestRequestIdRef.current++;
    //   const requestId = latestRequestIdRef.current;
    await executeRequest(async () => {
      await refreshTasks(/*requestId,*/ label);
    });
  };

  const handleCreateTask = async () => {
    await executeRequest(async () => {
      await createTask(createTaskData);
      await refreshTasks();
    });
  };

  const handleUpdateTask = async () => {
    await executeRequest(async () => {
      await updateTask('task-4', createTaskData);
      await refreshTasks();
    });
  };

  const handleDeleteTask = async () => {
    await executeRequest(async () => {
      await deleteTask('task-4');
      await refreshTasks();
    });
  };

  useEffect(() => {
    handleLoadTasks();
  }, []);

  return (
    <div>
      <button type="button" onClick={() => handleLoadTasks('fast', 200)}>
        Load tasks
      </button>
      <button type="button" onClick={() => handleLoadTasks('slow', 1200)}>
        Lazy load tasks
      </button>

      <p>Last loaded from: {lastLoadedFrom}</p>

      <button type="button" onClick={handleCreateTask}>
        Create test task
      </button>

      <button type="button" onClick={handleUpdateTask}>
        Update test task
      </button>

      <button type="button" onClick={handleDeleteTask}>
        Delete
      </button>

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : errorMessage ? (
        <div>
          <p>Error: {errorMessage}</p>
          <button type="button" onClick={() => handleLoadTasks('fast')}>
            Retry
          </button>
        </div>
      ) : apiTasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <div>
          <p>Tasks:</p>
          <ul>
            {apiTasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
