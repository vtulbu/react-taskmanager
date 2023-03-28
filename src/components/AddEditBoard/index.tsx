import { useState } from "react";
import { useBoards } from "src/providers/board/BoardProvider";
import { Column } from "src/providers/board/types";
import { useDialog } from "src/providers/dialog/DialogProvider";
import { Button } from "../Button";
import { CloseSvg } from "../SVGs/CloseSvg";
import { TextField } from "../TextField";
import * as S from "./styled";

export const AddEditBoard = ({
  isAddingColumnOnly,
  isEditing,
  boardId,
}: {
  isAddingColumnOnly?: boolean;
  isEditing?: boolean;
  boardId?: string;
}) => {
  const [{ boards }, { handleAddBoard, handleEditBoard }] = useBoards();

  const currentBoard = boards.find((board) => board.id === boardId);

  const [boardName, setBoardName] = useState<string>(
    isEditing ? currentBoard?.label || "" : ""
  );
  const [boardColumns, setBoardColumns] = useState<Column[]>(
    isEditing ? currentBoard?.columns || [] : []
  );
  const [, { closeDialog }] = useDialog();

  const handleAddColumn = () => {
    setBoardColumns((prevValue) => [...prevValue, { label: "" }]);
  };

  const dissmissColumn = (label: string) => {
    setBoardColumns((prevValue) =>
      prevValue.filter((column) => column.label !== label)
    );
  };

  return (
    <S.NewBoardContainer>
      <TextField
        label="Board Name"
        placeholder="e.g. Web Design"
        onChange={(e) => setBoardName(e.target.value)}
        value={boardName}
        disabled={isAddingColumnOnly}
      />
      <S.DissmissableContainer>
        {boardColumns.map((column, idx) => {
          return (
            <S.DissmissableTextField key={idx}>
              <TextField
                {...(idx === 0 && {
                  label: "Board Columns",
                })}
                value={boardColumns[idx].label}
                onChange={(e) => {
                  setBoardColumns((prevValue) => {
                    const values = [...prevValue];
                    values[idx].label = e.target.value;
                    return values;
                  });
                }}
              />
              <Button
                icon={<CloseSvg />}
                onClick={() => {
                  dissmissColumn(column.label || "");
                }}
                style={{
                  ...(idx === 0 && { marginTop: "24px" }),
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  height: "fit-content",
                }}
                padding="0"
              />
            </S.DissmissableTextField>
          );
        })}
      </S.DissmissableContainer>
      <Button
        color="secondary"
        label="+ Add New Column"
        onClick={() => {
          handleAddColumn();
        }}
      />
      <Button
        label={isEditing ? "Save Changes" : "Create New Board"}
        onClick={() => {
          isEditing
            ? handleEditBoard({
                label: boardName,
                boardId,
                columns: boardColumns,
              })
            : handleAddBoard({ label: boardName, columns: boardColumns });
          closeDialog();
        }}
      />
    </S.NewBoardContainer>
  );
};
