import { Board } from './types';

export const boards: Board[] = Array.from({ length: 10 }, (_, i) => ({
  id: `board-${i}`,
  label: `Board ${i}`,
  columns: Array.from({ length: 6 }, (_, j) => ({
    id: `column-${i}-${j}`,
    label: `Column ${j}`,
    task: Array.from({ length: 6 }, (_, k) => ({
      id: `task-${i}-${j}-${k}`,
      label: `Task ${k}`,
      description: `Description ${k}: We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.`,
      subTasks: Array.from({ length: 5 }, (_, l) => ({
        id: `subtask-${i}-${j}-${k}-${l}`,
        label: `Subtask ${l}`,
        isDone: l % 2 === 0,
      })),
    })),
  })),
}));
