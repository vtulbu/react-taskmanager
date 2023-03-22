import styled from "@emotion/styled";
import { Sidebar as PrimeSidebar } from "primereact/sidebar";

export const Sidebar = styled(PrimeSidebar)`
  && {
    width: 260px;
    height: calc(100vh - 80px);
    top: 80px;
    border-top: none;
    border-right: 1px solid
      ${({ theme }) =>
        theme.mode === "dark" ? theme.colors.grayMain : theme.colors.whiteDark};
    background-color: ${({ theme }) =>
      theme.mode === "dark" ? theme.colors.grayDark : theme.colors.white};

    box-shadow: none;

    .p-sidebar-content {
      padding: 0;
    }

    &.p-sidebar .p-sidebar-header {
      padding: 0;
    }

    &.p-sidebar:not([class*="p-sidebar-"]) {
      ${({ visible }) => (!visible ? "display: none" : "display: block")}
    }

    .p-button.p-button-text {
      border-radius: 6px;
      color: ${({ theme }) => theme.colors.grayLight};
      display: flex;
      gap: 1rem;

      &:hover {
        color: ${({ theme }) => theme.colors.grayLight};
      }
    }
  }
`;
