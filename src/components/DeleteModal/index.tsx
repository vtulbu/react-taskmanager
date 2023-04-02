import { FC } from 'react';
import { BOARD, DELETE, TASK } from 'src/constants';
import { useBoards } from 'src/providers/board/BoardProvider';
import { Button } from '../Button';

import './styled.css';
import { useRouterQueryListener } from 'src/hooks';
import { useDialog } from 'src/providers/dialog/DialogProvider';

export const DeleteModal: FC = () => {
  const [, { closeDialog }] = useDialog();
  const [{ currentBoard }, { handleDeleteBoard, handleDeleteTask }] =
    useBoards();
  const { boardAction, taskAction, taskId, columnId } =
    useRouterQueryListener();

  const deletedItem = () => {
    if (boardAction === DELETE) {
      return BOARD;
    } else if (taskAction === DELETE) {
      return TASK;
    } else {
      return '';
    }
  };

  const selectedColumn = currentBoard?.columns.find((c) => c.id === columnId);
  const selectedTask = selectedColumn?.task.find((t) => t.id === taskId);

  const onConfirmDelete = () => {
    if (deletedItem() === BOARD) {
      handleDeleteBoard();
    }
    if (deletedItem() === TASK) {
      handleDeleteTask({
        taskId: selectedTask?.id || '',
        columnId: selectedColumn?.id || '',
        boardId: currentBoard?.id || '',
      });
    }
    closeDialog();
  };

  return (
    <div className='container'>
      <h2 className='text-heading'>Delete this {deletedItem()}?</h2>
      <p>
        {`Are you sure you want to delete the ${
          deletedItem() === BOARD
            ? `'${currentBoard?.label}' board`
            : `${selectedTask?.label} task and its subtasks`
        }? ${
          deletedItem() === BOARD
            ? 'This action will remove all columns and tasks and cannot be reversed.'
            : 'This action cannot be reversed.'
        }`}
      </p>
      <div className='buttons-container'>
        <Button severity='danger' onClick={onConfirmDelete}>
          Delete
        </Button>
        <Button text onClick={() => closeDialog()}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
