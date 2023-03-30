import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DotMenu } from '..';
import { Button } from '../Button';

import { LogoSVG } from '../SVGs/LogoSvg';
import { PlusSvg } from '../SVGs/PlusSvg';
import { LogoIconSvg } from '../SVGs/LogoIconSvg';
import { SidebarArrowSvg } from '../SVGs/SideBarArrowSvg';
import { useSidebar } from 'src/providers/sidebar/SidebarProvider';
import { useBoards } from 'src/providers/board/BoardProvider';

import * as S from './styled';
import { useDialog } from 'src/providers/dialog/DialogProvider';
import { AddEditTask } from '../AddEditTask';
import { BOARD, CREATE, DELETE, EDIT, TASK_ACTION } from 'src/constants';
import { useRouterQueryListener } from 'src/providers/hooks';
import { DeleteModal } from '../DeleteModal';

export const Header: FC = () => {
  const navigate = useNavigate();
  const { taskAction } = useRouterQueryListener();
  const [, { handleSidebarState }] = useSidebar();
  const [, { openDialog }] = useDialog();
  const [{ currentBoard }] = useBoards();
  const isCreatingTask = taskAction === CREATE;
  const isEditingTask = taskAction === EDIT;
  const isDeletingTask = taskAction === DELETE;

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
    <S.HeaderContainer>
      {window.innerWidth <= 768 ? <LogoIconSvg /> : <LogoSVG />}
      {/* {window.innerWidth >= 769 && <S.Divider />} */}
      <S.HeaderTitleAndActions>
        <S.HeaderTitle
          onClick={() => {
            window.innerWidth <= 768 && handleSidebarState();
          }}
        >
          {currentBoard && <S.BoardName>{currentBoard.label}</S.BoardName>}
          {window.innerWidth <= 768 && <SidebarArrowSvg />}
        </S.HeaderTitle>

        <S.HeaderActions>
          <Button
            onClick={() => navigate(`?${TASK_ACTION}=${CREATE}`)}
            label={window.innerWidth > 768 ? '+ Add New Task' : undefined}
            {...(window.innerWidth <= 768 && {
              icon: <PlusSvg />,
            })}
            disabled={!currentBoard?.columns.length}
          />
          <DotMenu forItem={BOARD} />
        </S.HeaderActions>
      </S.HeaderTitleAndActions>
    </S.HeaderContainer>
  );
};
