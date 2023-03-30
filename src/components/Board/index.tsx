import { useBoards } from 'src/providers/board/BoardProvider';
import { useDialog } from 'src/providers/dialog/DialogProvider';

import { Button } from '../Button';
import * as S from './styled';
import { AddEditBoard } from '../AddEditBoard';
import { useNavigate } from 'react-router-dom';
import { useRouterQueryListener } from 'src/providers/hooks';
import { useEffect } from 'react';
import { BOARD_ACTION, COLUMN_ID, DELETE, EDIT, TASK_ID } from 'src/constants';
import { ViewTask } from '../ViewTask';
import { DeleteModal } from '../DeleteModal';

export const Board = () => {
  const navigate = useNavigate();
  const { boardAction, taskId, taskAction } = useRouterQueryListener();
  const isEditingBoard = boardAction === EDIT;
  const isDeletingBoard = boardAction === DELETE;
  const [{ currentBoard }] = useBoards();
  const [, { openDialog }] = useDialog();

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

  return (
    <S.BoardContainer empty={!Boolean(currentBoard?.columns?.length)}>
      {currentBoard?.columns?.map((column) => (
        <S.BoardColumn key={column.id}>
          <S.BoardColumnLabel>
            {column.label}
            {/* <S.ColumnBadge color={generateColor()} /> {column.label} */}
          </S.BoardColumnLabel>
          {column.task?.map((task) => {
            return (
              <S.ColumnTask
                key={task.id}
                onClick={() =>
                  navigate(`?${TASK_ID}=${task.id}&${COLUMN_ID}=${column.id}`)
                }
              >
                <S.TaskLabel>{task.label}</S.TaskLabel>
                <S.SubTaskLabel>
                  0 of {task.subTasks?.length} subtasks
                </S.SubTaskLabel>
              </S.ColumnTask>
            );
          })}
        </S.BoardColumn>
      ))}
      {!currentBoard?.columns?.length && (
        <>
          <S.EmptyBoardLabel>
            This board is empty. Create a new column to get started.
          </S.EmptyBoardLabel>
          <Button
            onClick={() => navigate(`?${BOARD_ACTION}=${EDIT}`)}
            label='+ Add New Column'
          />
        </>
      )}
    </S.BoardContainer>
  );
};
