import { Route, Routes } from "react-router-dom";
import { Board } from "../Board";
import { PAGE_OF_BOARD } from "src/constants";

export const AppContent = () => {
  return (
    <Routes>
      <Route path={PAGE_OF_BOARD} element={<Board />} />
    </Routes>
  );
};
