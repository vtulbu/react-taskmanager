import { useThemeProvider } from "src/providers/theme/ThemeProvider";
import { SidebarProps, Sidebar as PrimeSidebar } from "primereact/sidebar";
import { useSidebar } from "src/providers/sidebar/SidebarProvider";

import s from "./Sidebar.module.css";

export const Sidebar = (props: SidebarProps) => {
  const { themeMode } = useThemeProvider();
  const [{ isSidebarOpen }] = useSidebar();

  return (
    <PrimeSidebar
      {...props}
      maskStyle={{ position: "absolute" }}
      modal={false}
      dismissable={false}
      showCloseIcon={false}
      className={`${s.sidebar} ${themeMode === "dark" && s.sidebarDark} ${
        isSidebarOpen && s.sidebarTest
      }`}
    >
      {props.children}
    </PrimeSidebar>
  );
};
