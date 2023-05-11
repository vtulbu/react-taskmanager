import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { DialogProvider, SidebarProvider, ThemeProvider } from "./providers";

import "normalize.css";
import "primeicons/primeicons.css";

import { BoardProvider } from "./providers/board/BoardProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <BoardProvider>
          <DialogProvider>
            <SidebarProvider>
              <App />
            </SidebarProvider>
          </DialogProvider>
        </BoardProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
