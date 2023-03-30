import { Board } from './types';

export const boards: Board[] = [
  {
    id: 'new',
    label: 'New',
    columns: [],
  },
  {
    id: 'delete',
    label: 'Delete',
    columns: [
      {
        id: 'test1',
        label: 'Test 1',
        task: [
          {
            id: 'task1',
            label: 'Task1',
            description:
              "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
            subTasks: [
              {
                id: 'subtask1',
                label: 'Subtask 1',
                isDone: true,
              },
            ],
          },
        ],
      },
      {
        id: 'test2',
        label: 'Test 2',
        task: [
          {
            id: 'task2',
            label: 'Task2',
            description:
              "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
            subTasks: [
              {
                id: 'subtask2',
                label: 'Subtask 2',
                isDone: false,
              },
            ],
          },
        ],
      },
    ],
  },
];
