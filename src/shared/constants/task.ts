export const TASK_SORT = {
  DEFAULT: 'default',
  TITLE_ASC: 'title-asc',
  TITLE_DESC: 'title-desc',
} as const;

export type TaskSort = (typeof TASK_SORT)[keyof typeof TASK_SORT];

export const TASK_STATUS = {
  BACKLOG: 'backlog',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
} as const;

export type Status = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export type Priority = (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY];
