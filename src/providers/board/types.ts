export type Task = {
  label?: string;
  id?: string;
  description?: string;
  subTasks?: { label: string }[];
};

export type Column = {
  label?: string;
  id?: string;
  task?: Task[];
};

export type Board = {
  label?: string;
  id?: string;
  columns?: Column[];
};
