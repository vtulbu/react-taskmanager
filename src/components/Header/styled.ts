import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.grayDark : theme.colors.white};
  transition: background-color 0.2s;
  position: relative;
  border-bottom: 1px solid var(--lines);

  @media (max-width: 768px) {
    grid-template-columns: 25px 1fr;
    height: 64px;
    z-index: 1200;
  }

  @media (min-width: 768px) {
    padding: 16px 24px;
  }

  @media (min-width: 1440px) {
    padding: 20px 32px 28px 24px;
  }
`;

export const HeaderTitleAndActions = styled.div`
  width: 100%;
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

  @media (max-width: 768px) {
    cursor: pointer;
    height: 24px;
    width: fit-content;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  height: fit-content;
  align-items: center;
  gap: 16px;
`;

export const Divider = styled.div`
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.grayMain : theme.colors.whiteDark};
  width: 100%;
  height: 100%;
  transition: background-color 0.2s;
`;

export const BoardName = styled.h2`
  font-size: 24px;
  line-height: 30px;
`;
