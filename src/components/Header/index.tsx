import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DotMenu } from '..';

import { LogoSVG } from '../SVGs/LogoSvg';
import { PlusSvg } from '../SVGs/PlusSvg';
import { LogoIconSvg } from '../SVGs/LogoIconSvg';
import { SidebarArrowSvg } from '../SVGs/SideBarArrowSvg';
import { useSidebar } from 'src/providers/sidebar/SidebarProvider';
import { useBoards } from 'src/providers/board/BoardProvider';

import { useDialog } from 'src/providers/dialog/DialogProvider';
import { AddEditTask } from '../AddEditTask';
import { BOARD, CREATE, DELETE, EDIT, TASK_ACTION } from 'src/constants';
import { useRouterQueryListener, useScreenSize } from 'src/hooks';
import { DeleteModal } from '../DeleteModal';

import s from './Header.module.css';
import { useThemeProvider } from 'src/providers/theme/ThemeProvider';
import { Button } from 'primereact/button';

export const Header: FC = () => {
  const { themeMode } = useThemeProvider();
  const navigate = useNavigate();
  const { taskAction } = useRouterQueryListener();
  const [, { handleSidebarState }] = useSidebar();
  const [{ isDialogOpen }, { openDialog }] = useDialog();
  const [{ currentBoard }] = useBoards();
  const isCreatingTask = taskAction === CREATE;
  const isEditingTask = taskAction === EDIT;
  const isDeletingTask = taskAction === DELETE;

  const { isMobile } = useScreenSize();

  useEffect(() => {
    if (isCreatingTask || isEditingTask) {
      openDialog({
        body: <AddEditTask />,
        size: 'medium',
        title: isEditingTask ? 'Edit Task' : 'Add New Task',
      });
    }

    if (isDeletingTask) {
      openDialog({
        body: <DeleteModal />,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreatingTask, isEditingTask, isDeletingTask]);

  return (
    <header
      className={`${s.headerContainer} ${
        themeMode === 'dark' ? s.headerDark : s.headerLight
      } ${isDialogOpen && s.zIndex}`}
    >
      <div className={s.svgLogoLarge}>
        <LogoSVG />
      </div>
      <div className={s.svgLogoSmall}>{<LogoIconSvg />}</div>
      <div className={s.divider} />
      <div className={s.headerTitleAndActions}>
        <div
          className={s.headerTitle}
          onClick={() => {
            isMobile && handleSidebarState();
          }}
        >
          {currentBoard && (
            <h2 className={s.boardName}>{currentBoard.label}</h2>
          )}
          {isMobile && <SidebarArrowSvg />}
        </div>

        <div className={s.headerActions}>
          <Button
            className={s.addTaskButton}
            onClick={() => navigate(`?${TASK_ACTION}=${CREATE}`)}
            label={window.innerWidth >= 768 ? '+ Add New Task' : undefined}
            {...(window.innerWidth < 768 && {
              icon: <PlusSvg />,
            })}
            disabled={!currentBoard?.columns.length}
          />
          <DotMenu forItem={BOARD} />
        </div>
      </div>
    </header>
  );
};
