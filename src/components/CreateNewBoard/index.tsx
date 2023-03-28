import { useState } from "react";
import { useBoards } from "src/providers/board/BoardProvider";
import { useDialog } from "src/providers/dialog/DialogProvider";
import { Button } from "../Button";
import { CloseSvg } from "../SVGs/CloseSvg";
import { TextField } from "../TextField";
import * as S from "./styled";

export const CreateNewBoard = () => {
  const [boardName, setBoardName] = useState<string>("");
  const [boardColumns, setBoardColumns] = useState<{ label: string }[]>([]);
  const [, { handleAddBoard }] = useBoards();
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
                  dissmissColumn(column.label);
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
        label="Create New Board"
        onClick={() => {
          handleAddBoard({ label: boardName, columns: boardColumns });
          closeDialog();
        }}
      />
    </S.NewBoardContainer>
  );
};
