import styled from "@emotion/styled";
import { useSidebar } from "src/providers/sidebar/SidebarProvider";

const ArrowSvgContainer = styled.div<{ isSidebarOpen: boolean }>`
  position: absolute;
  right: -18px;
  top: 0;
  height: 7;
  transition: transform 0.2s ease-out, top 0.2s ease-out;
  ${({ isSidebarOpen }) =>
    isSidebarOpen && `transform: rotate(180deg); top: 5px;`};
`;

export const SidebarArrowSvg = () => {
  const [{ isSidebarOpen }] = useSidebar();

  return (
    <ArrowSvgContainer isSidebarOpen={isSidebarOpen}>
      <svg
        width="9"
        height="7"
        viewBox="0 0 9 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L5 5L9 1" stroke="#635FC7" stroke-width="2" />
      </svg>
    </ArrowSvgContainer>
  );
};
