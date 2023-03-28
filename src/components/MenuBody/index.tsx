import { useBoards } from "src/providers/board/BoardProvider";
import { useDialog } from "src/providers/dialog/DialogProvider";
import { useSidebar } from "src/providers/sidebar/SidebarProvider";
import { Button } from "../Button";
import { AddEditBoard } from "../AddEditBoard";
import { paths } from "../Sidebar/mockData";
import { BoardLinkSvg } from "../SVGs/BoardLinkSvg";
import { EyeClosedSvg } from "../SVGs/EyeClosedSvg";
import { ThemeSwitcher } from "../ThemeSwitcher";
import * as S from "./styled";

export const MenuBody = () => {
  const [, { handleSidebarState }] = useSidebar();
  const [, { openDialog }] = useDialog();
  const [{ boards }] = useBoards();

  return (
    <S.MenuContent>
      <div>
        <S.BoardsLabel>ALL BOARDS ({paths.length})</S.BoardsLabel>
        <S.NavLinks>
          {boards.map((p) => (
            <S.NavLink key={p.id} to={`/boards/${p.id}`}>
              <BoardLinkSvg /> {p.label}
            </S.NavLink>
          ))}
          <S.NavLink to="/create-new-board">
            <button
              onClick={() => {
                handleSidebarState();
                openDialog({
                  body: <AddEditBoard />,
                  size: "medium",
                  title: "Add New Board",
                });
              }}
              className="as-button"
            >
              <BoardLinkSvg />+ Create New Board
            </button>
          </S.NavLink>
        </S.NavLinks>
      </div>
      <S.SidebarActionContainer>
        <ThemeSwitcher />
        <Button
          onClick={handleSidebarState}
          text
          label="Hide Sidebar"
          icon={<EyeClosedSvg />}
        />
      </S.SidebarActionContainer>
    </S.MenuContent>
  );
};
