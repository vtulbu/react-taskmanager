import { useMatch } from "react-router-dom";
import { useBoards } from "src/providers/board/BoardProvider";
import { useDialog } from "src/providers/dialog/DialogProvider";

import { Button } from "../Button";
import * as S from "./styled";
import { AddEditBoard } from "../AddEditBoard";

export const Board = () => {
  const [{ boards }] = useBoards();
  const [, { openDialog }] = useDialog();
  const match = useMatch("boards/:id");
  const boardId = match?.params.id;
  const board = boards.find((board) => board.id === boardId);

  const openAddEditBoard = ({
    isAddingColumnOnly,
    isEditing,
  }: {
    isAddingColumnOnly?: boolean;
    isEditing: boolean;
  }) => {
    openDialog({
      body: (
        <AddEditBoard
          isAddingColumnOnly={isAddingColumnOnly}
          isEditing={isEditing}
          boardId={boardId}
        />
      ),
      size: window.innerWidth < 768 ? "small" : "medium",
      title: "Edit Board",
    });
  };

  const generateColor = () => Math.floor(Math.random() * 16777215).toString(16);

  return (
    <S.BoardContainer empty={!Boolean(board?.columns?.length)}>
      {board?.columns?.map((column) => (
        <S.BoardColumn key={column.id}>
          <S.BoardColumnLabel>
            <S.ColumnBadge color={generateColor()} /> {column.label}
          </S.BoardColumnLabel>
          {column.task?.map((task) => {
            return (
              <S.ColumnTask key={task.id}>
                <S.TaskLabel>{task.label}</S.TaskLabel>
                <S.SubTaskLabel>
                  0 of {task.subTasks?.length} subtasks
                </S.SubTaskLabel>
              </S.ColumnTask>
            );
          })}
        </S.BoardColumn>
      ))}
      {board && (
        <S.BoardColumn>
          <Button
            label="+ Add new column"
            onClick={() =>
              openAddEditBoard({ isEditing: true, isAddingColumnOnly: true })
            }
          />
        </S.BoardColumn>
      )}
      {!board?.columns?.length && (
        <>
          <S.EmptyBoardLabel>
            This board is empty. Create a new column to get started.
          </S.EmptyBoardLabel>
          <Button
            disabled
            onClick={() =>
              openAddEditBoard({ isEditing: true, isAddingColumnOnly: true })
            }
            label="+ Add New Column"
          />
        </>
      )}
    </S.BoardContainer>
  );
};
