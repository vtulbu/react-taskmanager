import {
  createContext,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from "react";
import { v4 as uuidv4 } from "uuid";

import { boards as boardsMock } from "./mockData";
import { Board, Column } from "./types";

type BoardContextState = {
  boards: Board[];
};
type BoardContextAction = {
  handleAddBoard: ({ label }: { label: string; columns: Column[] }) => void;
  handleAddColumn: ({
    boardId,
    label,
  }: {
    boardId: string;
    label: string;
  }) => void;
};

const BoardContext = createContext<[BoardContextState, BoardContextAction]>([
  { boards: [] },
  {
    handleAddBoard: () => {},
    handleAddColumn: () => {},
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
  label: string;
  columns?: Column[];
};

const reducer = (state: Board[], action: BoardActionsType): Board[] => {
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
      const newColumn: Column = {
        label: action.label,
        id: uuidv4(),
        task: [],
      };
      const board = state.find((b) => b.id === action.id);
      const boardWithNewColumn = {
        ...board,
        columns: [...(board?.columns ? board?.columns : []), newColumn],
      };
      const filteredBoards = state.filter(
        (prevBoard) => prevBoard.id !== board?.id
      );
      return [...filteredBoards, boardWithNewColumn];
    default:
      return state;
  }
};

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [boards, dispatch] = useReducer<Reducer<Board[], BoardActionsType>>(
    reducer,
    boardsMock
  );

  console.log(boards);

  const handleAddBoard = ({
    label,
    columns,
  }: {
    label: string;
    columns: Column[];
  }) => {
    dispatch({ type: AddActionsReducerTypes.AddBoard, label, columns });
  };

  const handleAddColumn = ({
    boardId,
    label,
  }: {
    boardId: string;
    label: string;
  }) => {
    dispatch({ type: AddActionsReducerTypes.AddColumn, id: boardId, label });
  };

  return (
    <BoardContext.Provider
      value={[{ boards }, { handleAddBoard, handleAddColumn }]}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoards = () => useContext(BoardContext);
