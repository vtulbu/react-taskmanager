import { useLocation } from 'react-router-dom';
import { BOARD_ACTION, COLUMN_ID, TASK_ACTION, TASK_ID } from 'src/constants';

export const useRouterQueryListener = () => {
  const match = useLocation();

  const boardAction = match.search.match(
    new RegExp(`${BOARD_ACTION}=(\\w+)`)
  )?.[1];
  const taskAction = match.search.match(`${TASK_ACTION}=(\\w+)`)?.[1];
  const taskId = match.search.match(`${TASK_ID}=(\\w+)`)?.[1];
  const columnId = match.search.match(`${COLUMN_ID}=(\\w+)`)?.[1];

  return {
    boardAction,
    taskAction,
    taskId,
    columnId,
  };
};
