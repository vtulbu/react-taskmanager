import { useSidebar } from "src/providers/sidebar/SidebarProvider";

import s from "./SidebarArraySvg.module.css";

export const SidebarArrowSvg = () => {
  const [{ isSidebarOpen }] = useSidebar();

  return (
    <div
      className={`${s.sidebarArraySvg} ${
        isSidebarOpen && s.sidebarArraySvgAnimation
      }`}
    >
      <svg
        width="9"
        height="7"
        viewBox="0 0 9 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L5 5L9 1" stroke="#635FC7" strokeWidth="2" />
      </svg>
    </div>
  );
};
