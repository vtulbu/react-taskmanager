import { useSidebar } from "src/providers/sidebar/SidebarProvider";
import { Button } from "../Button";
import { paths } from "../Sidebar/mockData";
import { BoardLinkSvg } from "../SVGs/BoardLinkSvg";
import { EyeClosedSvg } from "../SVGs/EyeClosedSvg";
import { ThemeSwitcher } from "../ThemeSwitcher";
import * as S from "./styled";

export const MenuBody = () => {
  const [, { handleSidebarState }] = useSidebar();

  return (
    <S.MenuContent>
      <div>
        <S.BoardsLabel>ALL BOARDS ({paths.length})</S.BoardsLabel>
        <S.NavLinks>
          {paths.map((p) => (
            <S.NavLink key={p.id} to={`/boards/${p.id}`}>
              <BoardLinkSvg /> {p.label}
            </S.NavLink>
          ))}
          <S.NavLink to="/create-new-board">
            <BoardLinkSvg />+ Create New Board
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
