export const BOARDS = 'boards' as const;
export const PAGE_OF_BOARD = `${BOARDS}/:id`;

export const CREATE = 'create' as const;
export const EDIT = 'edit' as const;
export const DELETE = 'delete' as const;

export const BOARD = 'board' as const;
export const TASK = 'task' as const;

export const BOARD_ACTION = 'boardAction';
export const TASK_ACTION = 'taskAction';
export const TASK_ID = 'taskId';
export const COLUMN_ID = 'columnId';

export const screenSizes = {
  xs: 0,
  sm: 375,
  md: 768,
  lg: 1440,
} as const;
