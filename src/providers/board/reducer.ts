import { camelCase, uniqueId } from "lodash";
import { AddActionsReducerTypes, BoardActionsType } from "./BoardProvider";
import { Board } from "./types";

export const reducer = (state: Board[], action: BoardActionsType): Board[] => {
  switch (action.type) {
    case AddActionsReducerTypes.AddBoard: {
      const payload = action.payload.addBoard;

      if (!payload) {
        return state;
      }

      const newBoard = {
        id: uniqueId(camelCase(payload.label)),
        label: payload.label,
        columns: payload.columns.map((c) => ({
          id: uniqueId(camelCase(c.label)),
          label: c.label,
          task: [],
        })),
      };

      return [...state, newBoard];
    }

    case AddActionsReducerTypes.EditBoard: {
      const payload = action.payload.editBoard;

      if (!payload) {
        return state;
      }

      return state.map((board) => {
        if (board.id === payload.id) {
          return {
            ...board,
            label: payload.label,
            columns: payload.columns.map((column) => {
              const existingColumn = board.columns.find(
                (e) => e.id === column.id
              );

              if (existingColumn) {
                return {
                  ...existingColumn,
                  label: column.label,
                };
              }

              return {
                id: uniqueId(camelCase(column.label)),
                label: column.label,
                task: [],
              };
            }),
          };
        }

        return board;
      });
    }

    case AddActionsReducerTypes.DeleteBoard: {
      const payload = action.payload.deleteBoard;

      if (!payload) {
        return state;
      }

      return state.filter((board) => board.id !== payload.id);
    }

    case AddActionsReducerTypes.AddTask: {
      const payload = action.payload.addTask;

      if (!payload) {
        return state;
      }

      return state.map((board) => {
        if (board.id === payload.boardId) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.id === payload.columnId) {
                return {
                  ...column,
                  task: [
                    ...column.task,
                    {
                      id: uniqueId(camelCase(payload.label)),
                      label: payload.label,
                      description: payload.description,
                      subTasks: payload.subTasks.map((subTask) => {
                        return {
                          id: uniqueId(camelCase(subTask.label)),
                          label: subTask.label,
                          isDone: false,
                        };
                      }),
                    },
                  ],
                };
              }

              return column;
            }),
          };
        }

        return board;
      });
    }

    case AddActionsReducerTypes.EditTask: {
      const payload = action.payload.editTask;

      if (!payload) {
        return state;
      }

      return state.map((board) => {
        if (board.id === payload.boardId) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.id === payload.columnId) {
                return {
                  ...column,
                  task: column.task.map((task) => {
                    if (task.id === payload.id) {
                      return {
                        ...task,
                        label: payload.label,
                        description: payload.description,
                        subTasks: payload.subTasks.map((editedSubTask) => {
                          const foundEditedSubtask = task.subTasks.find(
                            (s) => s.id === editedSubTask.id
                          );

                          if (foundEditedSubtask) {
                            return {
                              ...foundEditedSubtask,
                              label: editedSubTask.label,
                            };
                          }

                          return {
                            id: uniqueId(camelCase(editedSubTask.label)),
                            label: editedSubTask.label,
                            isDone: false,
                          };
                        }),
                      };
                    }

                    return task;
                  }),
                };
              }

              return column;
            }),
          };
        }

        return board;
      });
    }

    case AddActionsReducerTypes.DeleteTask: {
      const payload = action.payload.deleteTask;

      if (!payload) {
        return state;
      }

      return state.map((board) => {
        if (board.id === payload.boardId) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.id === payload.columnId) {
                return {
                  ...column,
                  task: column.task.filter(
                    (task) => task.id !== payload.taskId
                  ),
                };
              }

              return column;
            }),
          };
        }

        return board;
      });
    }

    case AddActionsReducerTypes.ChangeTaskStatus: {
      const payload = action.payload.changeTaskStatus;

      if (!payload) {
        return state;
      }

      return state.map((board) => {
        if (board.id === payload.boardId) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.id === payload.oldColumnId) {
                return {
                  ...column,
                  task: column.task.filter(
                    (task) => task.id !== payload.taskId
                  ),
                };
              } else if (column.id === payload.newColumnId) {
                const task = board.columns
                  .find((c) => c.id === payload.oldColumnId)
                  ?.task.find((t) => t.id === payload.taskId);

                if (task) {
                  return {
                    ...column,
                    task: [...column.task, task],
                  };
                }
              }
              return column;
            }),
          };
        }

        return board;
      });
    }

    case AddActionsReducerTypes.CheckSubTask: {
      const payload = action.payload.checkSubtask;

      if (!payload) {
        return state;
      }

      return state.map((board) => {
        if (board.id === payload.boardId) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.id === payload.columnId) {
                return {
                  ...column,
                  task: column.task.map((task) => {
                    if (task.id === payload.taskId) {
                      return {
                        ...task,
                        subTasks: task.subTasks.map((subTask) => {
                          if (subTask.id === payload.subtaskId) {
                            return {
                              ...subTask,
                              isDone: !subTask.isDone,
                            };
                          }

                          return subTask;
                        }),
                      };
                    }

                    return task;
                  }),
                };
              }

              return column;
            }),
          };
        }

        return board;
      });
    }

    case AddActionsReducerTypes.UpdateTaskColumnDrag: {
      const payload = action.payload.updateTaskColumnDrag;

      if (!payload) {
        return state;
      }

      return state.map((board) => {
        if (board.id === payload.boardId) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.id === payload.oldColumnId) {
                return {
                  ...column,
                  task: column.task.filter(
                    (task) => task.id !== payload.taskId
                  ),
                };
              }

              if (column.id === payload.newColumnId) {
                const task = board.columns
                  .find((c) => c.id === payload.oldColumnId)
                  ?.task.find((t) => t.id === payload.taskId);

                if (task) {
                  return {
                    ...column,
                    task: [...column.task, task],
                  };
                }
              }

              return column;
            }),
          };
        }

        return board;
      });
    }

    case AddActionsReducerTypes.UpdateTaskInColumnDrag: {
      const payload = action.payload.updateTaskInColumnDrag;

      if (!payload) {
        return state;
      }

      return state.map((board) => {
        if (board.id === payload.boardId) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.id === payload.columnId) {
                const taskIndex = column?.task.findIndex(
                  (t) => t.id === payload.taskId
                );

                if (taskIndex !== undefined && taskIndex !== -1) {
                  const task = column?.task[taskIndex];

                  return {
                    ...column,
                    task: column.task.map((t, index) => {
                      if (index === taskIndex) {
                        return column.task[payload.newIndex];
                      }

                      if (index === payload.newIndex) {
                        return task;
                      }

                      return t;
                    }),
                  };
                }

                return column;
              }

              return column;
            }),
          };
        }

        return board;
      });
    }

    default:
      return state;
  }
};
