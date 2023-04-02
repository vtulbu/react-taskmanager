import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { FC, useEffect, useRef } from "react";

import { ActionMenuDots } from "../SVGs/ActionMenuDots";

import {
  BOARD,
  BOARD_ACTION,
  COLUMN_ID,
  DELETE,
  EDIT,
  TASK,
  TASK_ACTION,
  TASK_ID,
} from "src/constants";

import { useRouterQueryListener } from "src/providers/hooks";

import s from "./DotMenu.module.css";

type DotMenuProps = {
  forItem: typeof BOARD | typeof TASK;
};

export const DotMenu: FC<DotMenuProps> = ({ forItem }) => {
  const navigate = useNavigate();
  const { boardAction, taskAction, taskId, columnId } =
    useRouterQueryListener();
  const menu = useRef<OverlayPanel>(null);

  const handleDelete = () => {
    if (forItem === BOARD) {
      navigate(`?${BOARD_ACTION}=${DELETE}`);
    }
    if (forItem === TASK) {
      navigate(
        `?${TASK_ACTION}=${DELETE}&${TASK_ID}=${taskId}&${COLUMN_ID}=${columnId}`
      );
    }
  };

  const handleEdit = () => {
    if (forItem === BOARD) {
      navigate(`?${BOARD_ACTION}=${EDIT}`);
    }
    if (forItem === TASK) {
      navigate(
        `?${TASK_ACTION}=${EDIT}&${TASK_ID}=${taskId}&${COLUMN_ID}=${columnId}`
      );
    }
  };

  useEffect(() => {
    if (boardAction || taskAction) {
      menu.current?.hide();
    }
  }, [boardAction, taskAction]);

  return (
    <div>
      <OverlayPanel ref={menu}>
        <div className={s.contentOverlay}>
          <div className={s.buttonMenu} onClick={handleEdit}>
            Edit {forItem}
          </div>
          <div className={`${s.buttonMenu} ${s.red}`} onClick={handleDelete}>
            Delete {forItem}
          </div>
        </div>
      </OverlayPanel>
      <Button
        text
        className={s["icon-button"]}
        onClick={(e) => menu.current?.toggle(e)}
      >
        <ActionMenuDots />
      </Button>
    </div>
  );
};
