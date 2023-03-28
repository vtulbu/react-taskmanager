import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
  height: 81px;
  width: 100%;
  display: grid;
  grid-template-columns: 225px 1px 1fr;
  align-items: center;
  padding: 0 4px 0 34px;
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? theme.colors.grayDark : theme.colors.white};

  transition: background-color 0.2s;
  position: relative;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.mode === "dark" ? theme.colors.grayMain : theme.colors.whiteDark};

  @media only screen and (max-width: 768px) {
    grid-template-columns: 25px 1fr;
    padding: 0 4px 0 25px;
    height: 64px;
    z-index: 9999;
  }
`;

export const LogoContainer = styled.div``;

export const HeaderTitleAndActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;

  h2 {
    margin: 0;
    font-size: 18px;
    line-height: 23px;
    padding: 0;
  }

  @media only screen and (max-width: 768px) {
    cursor: pointer;
    height: 24px;
    width: fit-content;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  height: fit-content;
  align-items: center;
`;

export const Divider = styled.div`
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? theme.colors.grayMain : theme.colors.whiteDark};
  width: 100%;
  height: 100%;
  transition: background-color 0.2s;
`;
