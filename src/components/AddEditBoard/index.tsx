import { FC, useEffect, useState } from 'react';
import { AddBoard, useBoards } from 'src/providers/board/BoardProvider';
import { useDialog } from 'src/providers/dialog/DialogProvider';
import { Button } from '../Button';
import { CloseSvg } from '../SVGs/CloseSvg';
import { TextField } from '../TextField';
import { EDIT } from 'src/constants';
import styles from './AddEditBoard.module.css';
import { useRouterQueryListener } from 'src/hooks';

export const AddEditBoard: FC = () => {
  const { boardAction } = useRouterQueryListener();
  const isEditing = boardAction === EDIT;
  const [, { closeDialog }] = useDialog();

  const [{ currentBoard }, { handleAddBoard, handleEditBoard }] = useBoards();

  const [boardForm, setBoardForm] = useState<AddBoard>({
    label: '',
    columns: [],
  });

  useEffect(() => {
    if (isEditing) {
      setBoardForm({
        label: currentBoard?.label || '',
        columns: currentBoard?.columns || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  return (
    <div className={styles.newBoardContainer}>
      <TextField
        label='Board Name'
        placeholder='e.g. Web Design'
        onChange={(e) => setBoardForm({ ...boardForm, label: e.target.value })}
        value={boardForm.label}
      />
      <div className={styles.dissmissableContainer}>
        {boardForm.columns.map((column, idx) => {
          return (
            <div className={styles.dissmissableTextfield} key={column.label}>
              <TextField
                {...(idx === 0 && {
                  label: 'Board Columns',
                })}
                value={boardForm.columns[idx].label}
                onChange={(e) => {
                  setBoardForm((prevValue) => {
                    return {
                      ...prevValue,
                      columns: prevValue.columns.map((column, index) => {
                        return index === idx
                          ? { ...column, label: e.target.value }
                          : column;
                      }),
                    };
                  });
                }}
              />
              <Button
                icon={<CloseSvg />}
                onClick={() => {
                  setBoardForm((prevValue) => {
                    return {
                      ...prevValue,
                      columns: prevValue.columns.filter(
                        (_column, index) => index !== idx
                      ),
                    };
                  });
                }}
                style={{
                  ...(idx === 0 && { marginTop: '24px' }),
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  height: 'fit-content',
                }}
              />
            </div>
          );
        })}
      </div>
      <Button
        color='secondary'
        label='+ Add New Column'
        onClick={() => {
          setBoardForm((prevValue) => {
            return {
              ...prevValue,
              columns: [...prevValue.columns, { label: '' }],
            };
          });
        }}
      />
      <Button
        label={isEditing ? 'Save Changes' : 'Create New Board'}
        disabled={!boardForm.label}
        onClick={() => {
          isEditing
            ? handleEditBoard({
                ...boardForm,
                id: currentBoard?.id || '',
              })
            : handleAddBoard(boardForm);
          closeDialog();
        }}
      />
    </div>
  );
};
