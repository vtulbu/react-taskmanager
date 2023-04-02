import { useBoards } from 'src/providers/board/BoardProvider';
import { useDialog } from 'src/providers/dialog/DialogProvider';

import { Button } from '../Button';
import { AddEditBoard } from '../AddEditBoard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BOARD_ACTION, COLUMN_ID, DELETE, EDIT, TASK_ID } from 'src/constants';
import { ViewTask } from '../ViewTask';
import { DeleteModal } from '../DeleteModal';

import s from './Board.module.css';
import { useThemeProvider } from 'src/providers/theme/ThemeProvider';
import { useRouterQueryListener } from 'src/hooks';

export const Board = () => {
  const navigate = useNavigate();
  const { boardAction, taskId, taskAction } = useRouterQueryListener();
  const isEditingBoard = boardAction === EDIT;
  const isDeletingBoard = boardAction === DELETE;
  const [{ currentBoard }] = useBoards();
  const [, { openDialog }] = useDialog();
  const { themeMode } = useThemeProvider();

  useEffect(() => {
    if (isEditingBoard) {
      openDialog({
        body: <AddEditBoard />,
        size: window.innerWidth < 768 ? 'small' : 'medium',
        title: 'Edit Board',
      });
    }

    if (isDeletingBoard) {
      openDialog({
        body: <DeleteModal />,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingBoard, isDeletingBoard]);

  useEffect(() => {
    if (taskId && !taskAction) {
      openDialog({
        body: <ViewTask />,
      });
    }
  }, [taskId]);

  const isBoardEmpty = !Boolean(currentBoard?.columns?.length);

  {
    /* <S.ColumnBadge color={generateColor()} /> {column.label} */
  }

  return (
    <div
      className={`${s.boardContainer} ${isBoardEmpty && s.emptyBoardContainer}`}
    >
      {currentBoard?.columns?.map((column) => (
        <div className={s.boardColumn} key={column.id}>
          <div
            className={`${s.boardColumnLabel} ${
              themeMode === 'light' && s.boardColumnLabelLight
            }`}
          >
            {column.label} ({column.task.length})
          </div>
          {column.task?.map((task) => {
            return (
              <div
                className={s.columnTask}
                key={task.id}
                onClick={() =>
                  navigate(`?${TASK_ID}=${task.id}&${COLUMN_ID}=${column.id}`)
                }
              >
                <div className={s.taskLabel}>{task.label}</div>
                <div className={s.subTaskLabel}>
                  0 of {task.subTasks?.length} subtasks
                </div>
              </div>
            );
          })}
        </div>
      ))}
      {!currentBoard?.columns?.length && (
        <>
          <div className={s.emptyBoardLabel}>
            This board is empty. Create a new column to get started.
          </div>
          <Button
            onClick={() => navigate(`?${BOARD_ACTION}=${EDIT}`)}
            label='+ Add New Column'
          />
        </>
      )}
    </div>
  );
};
