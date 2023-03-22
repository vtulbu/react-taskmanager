import { Route, Routes } from "react-router-dom";
import { Board } from "../Board";

export const AppContent = () => {
  return (
    <>
      <Routes>
        <Route path="/boards/:id" element={<Board />} />
        <Route path="/create-new-board" element={<>create new board</>} />
      </Routes>
    </>
  );
};
