import { useMatch } from "react-router-dom";
import { useBoards } from "src/providers/board/BoardProvider";
import { useDialog } from "src/providers/dialog/DialogProvider";

import { Button } from "../Button";
import * as S from "./styled";

export const Board = () => {
  const [{ boards }, { handleAddColumn }] = useBoards();
  const [, { openDialog }] = useDialog();
  const match = useMatch("boards/:id");
  const boardId = match?.params.id;
  const board = boards.find((board) => board.id === boardId);

  return (
    <S.BoardContainer>
      {board?.label}
      {board?.columns?.map((column) => (
        <div>{column.label}</div>
      ))}
      {board && (
        <Button
          label="Add new column"
          onClick={() => openDialog({ body: <>Add column to be modified</> })}
        />
      )}
      {!board?.columns?.length && (
        <>
          <S.EmptyBoardLabel>
            This board is empty. Create a new column to get started.
          </S.EmptyBoardLabel>
          <Button disabled label="+ Add New Column" />
        </>
      )}
    </S.BoardContainer>
  );
};
