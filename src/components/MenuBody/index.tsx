import { useBoards } from 'src/providers/board/BoardProvider';
import { useDialog } from 'src/providers/dialog/DialogProvider';
import { useSidebar } from 'src/providers/sidebar/SidebarProvider';
import { AddEditBoard } from '../AddEditBoard';
import { BoardLinkSvg } from '../SVGs/BoardLinkSvg';
import { EyeClosedSvg } from '../SVGs/EyeClosedSvg';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { useRouterQueryListener } from 'src/hooks';
import { BOARDS, BOARD_ACTION, CREATE } from 'src/constants';
import { NavLinkProps, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

import s from './MenuBody.module.css';

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

  const navLinkStyle: NavLinkProps['style'] = ({ isActive }) => {
    return {
      color: isActive ? '#fff' : 'var(--medium-grey)',
      ...(isActive && { backgroundColor: 'var(--primary-color)' }),
    };
  };

  return (
    <div className={s.menuContent}>
      <div>
        <div className={s.boardsLabel}>ALL BOARDS ({boards.length})</div>
        <div className={s.navLinks}>
          {boards.map((p) => (
            <RouterNavLink
              style={navLinkStyle}
              className={`${s.navLink}`}
              key={p.id}
              to={`/${BOARDS}/${p.id}`}
            >
              {({ isActive }) => (
                <>
                  <BoardLinkSvg color={isActive ? '#fff' : '#828fa3'} />
                  {p.label}
                </>
              )}
            </RouterNavLink>
          ))}
          <button
            onClick={() => {
              handleSidebarState();
              navigate(`?${BOARD_ACTION}=${CREATE}`);
            }}
            className={s.createBoardButton}
          >
            <BoardLinkSvg color='#828fa3' />
            <p>+ Create New Board</p>
          </button>
        </div>
      </div>
      <div className={s.sidebarActionContainer}>
        <ThemeSwitcher />
        {window.innerWidth >= 768 && (
          <button onClick={handleSidebarState} className={s['hide-sidebar']}>
            <EyeClosedSvg />
            Hide Sidebar
          </button>
        )}
      </div>
    </div>
  );
};
