import { useBoards } from 'src/providers/board/BoardProvider';
import { useDialog } from 'src/providers/dialog/DialogProvider';
import { useSidebar } from 'src/providers/sidebar/SidebarProvider';
import { Button } from '../Button';
import { AddEditBoard } from '../AddEditBoard';
import { paths } from '../Sidebar/mockData';
import { BoardLinkSvg } from '../SVGs/BoardLinkSvg';
import { EyeClosedSvg } from '../SVGs/EyeClosedSvg';
import { ThemeSwitcher } from '../ThemeSwitcher';
import * as S from './styled';
import { useRouterQueryListener } from 'src/providers/hooks';
import { BOARDS, BOARD_ACTION, CREATE } from 'src/constants';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const MenuBody = () => {
  const navigate = useNavigate();
  const [, { handleSidebarState }] = useSidebar();
  const [, { openDialog }] = useDialog();
  const [{ boards }] = useBoards();
  const { boardAction } = useRouterQueryListener();
  const isCreating = boardAction === CREATE;

  useEffect(() => {
    if (isCreating) {
      openDialog({
        body: <AddEditBoard />,
        size: window.innerWidth < 768 ? 'small' : 'medium',
        title: 'Add New Board',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreating]);

  return (
    <S.MenuContent>
      <div>
        <S.BoardsLabel>ALL BOARDS ({paths.length})</S.BoardsLabel>
        <S.NavLinks>
          {boards.map((p) => (
            <S.NavLink key={p.id} to={`/${BOARDS}/${p.id}`}>
              <BoardLinkSvg /> {p.label}
            </S.NavLink>
          ))}
          <S.CreateBoardButton
            onClick={() => {
              handleSidebarState();
              navigate(`?${BOARD_ACTION}=${CREATE}`);
            }}
            className='as-button'
          >
            <BoardLinkSvg />
            <p>+ Create New Board</p>
          </S.CreateBoardButton>
        </S.NavLinks>
      </div>
      <S.SidebarActionContainer>
        <ThemeSwitcher />
        {window.innerWidth >= 768 && (
          <button onClick={handleSidebarState} className='hide-sidebar'>
            <EyeClosedSvg />
            Hide Sidebar
          </button>
        )}
      </S.SidebarActionContainer>
    </S.MenuContent>
  );
};
