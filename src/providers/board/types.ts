export type Task = {
  label: string;
  id: string;
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
