import { FC } from "react";
import { useMatch } from "react-router-dom";

import { DotMenu } from "..";
import { Button } from "../Button";

import { LogoSVG } from "../SVGs/LogoSvg";
import { PlusSvg } from "../SVGs/PlusSvg";
import { LogoIconSvg } from "../SVGs/LogoIconSvg";
import { SidebarArrowSvg } from "../SVGs/SideBarArrowSvg";
import { useSidebar } from "src/providers/sidebar/SidebarProvider";
import { useBoards } from "src/providers/board/BoardProvider";

import * as S from "./styled";
import { useDialog } from "src/providers/dialog/DialogProvider";
import { AddEditTask } from "../AddEditTask";

export const Header: FC = () => {
  const [, { handleSidebarState }] = useSidebar();
  const [, { openDialog }] = useDialog();
  const [{ boards }] = useBoards();
  const match = useMatch("boards/:id");
  const boardName = boards.find(
    (board) => board.id === match?.params.id
  )?.label;

  return (
    <S.HeaderContainer>
      <S.LogoContainer>
        {window.innerWidth <= 768 ? <LogoIconSvg /> : <LogoSVG />}
      </S.LogoContainer>
      {window.innerWidth >= 769 && <S.Divider />}
      <S.HeaderTitleAndActions>
        <S.HeaderTitle
          onClick={() => {
            window.innerWidth <= 768 && handleSidebarState();
          }}
        >
          {boardName && <h2>{boardName}</h2>}
          {window.innerWidth <= 768 && <SidebarArrowSvg />}
        </S.HeaderTitle>

        <S.HeaderActions>
          <Button
            onClick={() => {
              openDialog({
                body: <AddEditTask boardId={match?.params.id} />,
                size: "medium",
                title: "Add New Task",
              });
            }}
            label={window.innerWidth > 768 ? "+ Add New Task" : undefined}
            {...(window.innerWidth <= 768 && {
              icon: <PlusSvg />,
              padding: "10px 18px",
            })}
          />
          <DotMenu buttonVariant={{ text: true }} />
        </S.HeaderActions>
      </S.HeaderTitleAndActions>
    </S.HeaderContainer>
  );
};
