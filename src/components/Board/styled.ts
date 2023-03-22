import styled from "@emotion/styled";

export const BoardContainer = styled.div<{ isSidebarOpen?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`;

export const EmptyBoardLabel = styled.p`
  color: ${({ theme }) => theme.colors.grayLight};
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  padding: 0 70px;
`;
