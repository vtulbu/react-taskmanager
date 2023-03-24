import { Button } from "../Button";
import * as S from "./styled";

export const Board = () => {
  return (
    <S.BoardContainer>
      <S.EmptyBoardLabel>
        This board is empty. Create a new column to get started.
      </S.EmptyBoardLabel>
      <Button disabled label="+ Add New Column" />
    </S.BoardContainer>
  );
};
