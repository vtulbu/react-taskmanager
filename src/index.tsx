import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ResizeObserver from "react-resize-detector";

import App from "./App";
import { DialogProvider, SidebarProvider, ThemeProvider } from "./providers";

import "normalize.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ResizeObserver>
      <BrowserRouter>
        <ThemeProvider>
          <DialogProvider>
            <SidebarProvider>
              <App />
            </SidebarProvider>
          </DialogProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ResizeObserver>
  </React.StrictMode>
);
