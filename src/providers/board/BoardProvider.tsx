import {
  createContext,
  ReactNode,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { boards as boardsMock } from "./mockData";
import { Board, Column } from "./types";

type BoardContextState = {
  boards: Board[];
};
type BoardContextAction = {
  handleAddBoard: ({ label }: { label: string; columns: Column[] }) => void;
  handleEditBoard: ({
    label,
    boardId,
    columns,
  }: {
    label: string;
    boardId?: string;
    columns?: Column[];
  }) => void;
  handleAddTask: ({
    label,
    description,
    boardId,
    status,
    subTasks,
  }: {
    label: string;
    description: string;
    status: string;
    subTasks: { label: string }[];
    boardId: string | undefined;
  }) => void;
};

const BoardContext = createContext<[BoardContextState, BoardContextAction]>([
  { boards: [] },
  {
    handleAddBoard: () => {},
    handleEditBoard: () => {},
    handleAddTask: () => {},
  },
]);

enum AddActionsReducerTypes {
  AddBoard = "ADD_BOARD",
  AddColumn = "ADD_COLUMN",
  AddTask = "ADD_TASK",
}

type BoardActionsType = {
  type: AddActionsReducerTypes;
  id?: string;
  label?: string;
  columns?: Column[];
  columnId?: string;
  taskDescription?: string;
  subTasks?: { label: string }[];
};

const reducer = (state: Board[], action: BoardActionsType): Board[] => {
  const board = state.find((b) => b.id === action.id);
  const filteredBoards = state.filter(
    (prevBoard) => prevBoard.id !== board?.id
  );
  switch (action.type) {
    case AddActionsReducerTypes.AddBoard:
      const columns = action.columns?.length
        ? action.columns.map((c) => ({
            label: c.label,
            id: uuidv4(),
            task: [],
          }))
        : [];
      const newBoard: Board = {
        label: action.label,
        id: uuidv4(),
        columns,
      };
      return [...state, newBoard];
    case AddActionsReducerTypes.AddColumn:
      const boardWithNewColumn = {
        ...board,
        label: action.label,
        columns: action.columns,
      };

      return [...filteredBoards, boardWithNewColumn];

    case AddActionsReducerTypes.AddTask:
      const column = board?.columns?.find(
        (column) => column.id === action.columnId
      );
      const columnWithNewTask: Column = {
        ...column,
        task: [
          ...(column?.task || []),
          {
            label: action.label,
            id: uuidv4(),
            description: action.taskDescription,
            subTasks: action.subTasks,
          },
        ],
      };

      const filteredColumns = board?.columns?.filter(
        (currColumn) => currColumn.id !== column?.id
      );

      const boardWithNewTask = {
        ...board,
        columns: [...(filteredColumns || []), columnWithNewTask],
      };
      return [...filteredBoards, boardWithNewTask];
    default:
      return state;
  }
};

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const lsBoards: Board[] = JSON.parse(localStorage.getItem("boards") ?? "[]");
  const navigate = useNavigate();
  const match = useMatch("boards/:id");
  const routerBoardId = match?.params.id;

  const [boards, dispatch] = useReducer<Reducer<Board[], BoardActionsType>>(
    reducer,
    lsBoards.length ? lsBoards : boardsMock
  );

  useEffect(() => {
    if (!routerBoardId && boards.length) {
      navigate(`boards/${boards[0].id}` || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    boards.length > 0 && localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const handleAddBoard = ({
    label,
    columns,
  }: {
    label: string;
    columns: Column[];
  }) => {
    dispatch({ type: AddActionsReducerTypes.AddBoard, label, columns });
  };

  const handleEditBoard = ({
    label,
    boardId,
    columns,
  }: {
    label: string;
    boardId?: string;
    columns?: Column[];
  }) => {
    dispatch({
      type: AddActionsReducerTypes.AddColumn,
      id: boardId,
      columns,
      label,
    });
  };

  const handleAddTask = ({
    label,
    description,
    boardId,
    status,
    subTasks,
  }: {
    label: string;
    description: string;
    status: string;
    subTasks: { label: string }[];
    boardId: string | undefined;
  }) => {
    dispatch({
      type: AddActionsReducerTypes.AddTask,
      label,
      taskDescription: description,
      id: boardId,
      columnId: status,
      subTasks,
    });
  };

  return (
    <BoardContext.Provider
      value={[{ boards }, { handleAddBoard, handleEditBoard, handleAddTask }]}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoards = () => useContext(BoardContext);
