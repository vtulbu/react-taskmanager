import {
  createContext,
  ReactNode,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import { boards as boardsMock } from './mockData';
import { Board, CreateBoard, CreateColumn, CreateTask } from './types';
import { noop } from 'lodash';
import { BOARDS, COLUMN_ID, PAGE_OF_BOARD, TASK_ID } from '../../constants';
import { reducer } from './reducer';

type BoardContextState = {
  boards: Board[];
  currentBoard?: Board;
};

type EditBoard = Board<true>;

export type AddBoard = CreateBoard & { columns: CreateColumn[] };
export type AddTask = CreateTask & {
  boardId: string;
  columnId: string;
  subTasks: { label: string }[];
};

type EditTask = CreateTask & {
  id: string;
  boardId: string;
  columnId: string;
  subTasks: { id?: string; label: string }[];
};

type ChangeTaskStatus = {
  taskId: string;
  oldColumnId: string;
  newColumnId: string;
  boardId: string;
};

type DeleteTask = {
  taskId: string;
  columnId: string;
  boardId: string;
};

type CheckSubtask = {
  subtaskId: string;
  taskId: string;
  columnId: string;
  boardId: string;
};

type BoardContextAction = {
  handleAddBoard: (props: AddBoard) => void;
  handleDeleteBoard: () => void;
  handleEditBoard: (props: EditBoard) => void;
  handleAddTask: (props: AddTask) => void;
  handleEditTask: (props: EditTask) => void;
  handleDeleteTask: (props: DeleteTask) => void;
  handleChangeTaskStatus: (props: ChangeTaskStatus) => void;
  handleCheckSubtask: (props: CheckSubtask) => void;
};

const BoardContext = createContext<[BoardContextState, BoardContextAction]>([
  { boards: boardsMock, currentBoard: undefined },
  {
    handleAddBoard: noop,
    handleDeleteBoard: noop,
    handleEditBoard: noop,
    handleAddTask: noop,
    handleEditTask: noop,
    handleDeleteTask: noop,
    handleChangeTaskStatus: noop,
    handleCheckSubtask: noop,
  },
]);

export enum AddActionsReducerTypes {
  AddBoard = 'ADD_BOARD',
  DeleteBoard = 'DELETE_BOARD',
  EditBoard = 'EDIT_BOARD',
  AddTask = 'ADD_TASK',
  EditTask = 'EDIT_TASK',
  DeleteTask = 'DELETE_TASK',
  ChangeTaskStatus = 'CHANGE_TASK_STATUS',
  CheckSubTask = 'CHECK_SUB_TASK',
}

export type BoardActionsType = {
  type: AddActionsReducerTypes;
  payload: {
    addBoard?: AddBoard;
    deleteBoard?: { id: string };
    editBoard?: EditBoard;
    addTask?: AddTask;
    editTask?: EditTask;
    deleteTask?: DeleteTask;
    changeTaskStatus?: ChangeTaskStatus;
    checkSubtask?: CheckSubtask;
  };
};

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [boards, dispatch] = useReducer<Reducer<Board[], BoardActionsType>>(
    reducer,
    boardsMock
  );

  const navigate = useNavigate();
  const routerBoardId = useMatch(PAGE_OF_BOARD)?.params.id;
  const currentBoard = boards.find((b) => b.id === routerBoardId);

  useEffect(() => {
    if (!routerBoardId && boards.length) {
      navigate(`${BOARDS}/${boards[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddBoard = (addBoard: AddBoard) => {
    dispatch({
      type: AddActionsReducerTypes.AddBoard,
      payload: { addBoard },
    });
  };

  const handleEditBoard = (editBoard: EditBoard) => {
    dispatch({
      type: AddActionsReducerTypes.EditBoard,
      payload: { editBoard },
    });
  };

  const handleDeleteBoard = () => {
    dispatch({
      type: AddActionsReducerTypes.DeleteBoard,
      payload: { deleteBoard: { id: currentBoard?.id || '' } },
    });
  };

  const handleAddTask = (addTask: AddTask) => {
    dispatch({
      type: AddActionsReducerTypes.AddTask,
      payload: { addTask },
    });
  };

  const handleEditTask = (editTask: EditTask) => {
    dispatch({
      type: AddActionsReducerTypes.EditTask,
      payload: { editTask },
    });
  };

  const handleDeleteTask = (deleteTask: DeleteTask) => {
    dispatch({
      type: AddActionsReducerTypes.DeleteTask,
      payload: { deleteTask },
    });
  };

  const handleChangeTaskStatus = (changeTaskStatus: ChangeTaskStatus) => {
    dispatch({
      type: AddActionsReducerTypes.ChangeTaskStatus,
      payload: { changeTaskStatus },
    });

    navigate(
      `${BOARDS}/${currentBoard?.id}?${TASK_ID}=${changeTaskStatus.taskId}&${COLUMN_ID}=${changeTaskStatus.newColumnId}`
    );
  };

  const handleCheckSubtask = (checkSubtask: CheckSubtask) => {
    dispatch({
      type: AddActionsReducerTypes.CheckSubTask,
      payload: { checkSubtask },
    });
  };

  return (
    <BoardContext.Provider
      value={[
        { boards, currentBoard },
        {
          handleAddBoard,
          handleEditBoard,
          handleDeleteBoard,
          handleAddTask,
          handleChangeTaskStatus,
          handleCheckSubtask,
          handleEditTask,
          handleDeleteTask,
        },
      ]}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoards = () => useContext(BoardContext);
