export type SubTask = {
  id: string;
  label: string;
  isDone: boolean;
};

export type Task = {
  id: string;
  label: string;
  description: string;
  subTasks: SubTask[];
};

export type Column = {
  id: string;
  label: string;
  task: Task[];
};

export type Board<Edit = unknown> = {
  id: string;
  label: string;
  columns: Edit extends true ? (CreateColumn & { id?: string })[] : Column[];
};

export type CreateTask = Pick<Task, 'label' | 'description'>;
export type CreateColumn = Pick<Column, 'label'>;
export type CreateBoard = Pick<Board, 'label'>;
