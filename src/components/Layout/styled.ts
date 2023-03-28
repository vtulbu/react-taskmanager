import styled from "@emotion/styled";

export const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div<{ isSidebarOpen: boolean }>`
  height: calc(100vh - 81px);
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? `260px` : `0`)};
  transition: margin 0.3s;
  background-color: ${({ theme }) =>
    theme.mode === "dark"
      ? theme.colors.veryDarkGray
      : theme.colors.almostWhite};

  @media only screen and (max-width: 768px) {
    height: calc(100vh - 64px);
    margin: 0;
  }
`;

export const SidebarButton = styled.div`
  position: absolute;
  bottom: 32px;
  left: 0;

  .p-button.p-button-icon-only {
    width: 56px;
    height: 48px;
    padding: 0;
    border-radius: 0 100px 100px 0;
  }
`;
