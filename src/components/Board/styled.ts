import styled from '@emotion/styled';
import { rgba } from 'polished';
import { Badge } from 'primereact/badge';

export const BoardContainer = styled.div<{ empty?: boolean }>`
  height: 100%;
  display: flex;
  padding: 24px;
  overflow-x: scroll;
  gap: 24px;
  ${({ empty }) =>
    empty
      ? `
        justify-content: center;
        align-items: center;
        flex-direction: column;
        `
      : ``};
`;

export const BoardColumn = styled.div`
  width: 280px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .p-button {
    margin-top: 38px;
    background: ${({ theme }) => rgba(theme.colors.grayDark, 0.3)};
    border-radius: 6px;
    height: 100%;
    color: ${({ theme }) => theme.colors.grayLight};
    &:hover {
      background: ${({ theme }) => rgba(theme.colors.grayDark, 0.6)};
      transition: background 0.1s ease-in;
    }
  }
`;

export const BoardColumnLabel = styled.div`
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 2.4px;
  color: ${({ theme }) => theme.colors.grayLight};
  margin-bottom: 4px;
  display: flex;
  gap: 12px;
  align-items: center;
  text-transform: uppercase;
`;

export const ColumnBadge = styled(Badge)<{ color: string }>`
  &.p-badge {
    background-color: ${({ color }) => `#${color}`};
    min-height: 15px;
    min-width: 15px;
    width: 15px;
    height: 15px;
  }
`;

export const ColumnTask = styled.div`
  background-color: var(--header);
  box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
  border-radius: 8px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: all 150ms ease-in-out;

  &:hover {
    background-color: var(--hover-card);
    transform: scale(1.02);
  }
`;

export const TaskLabel = styled.p`
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  margin: 0 0 8px;
`;

export const SubTaskLabel = styled.p`
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.grayLight};
  margin: 0;
`;

export const EmptyBoardLabel = styled.p`
  color: ${({ theme }) => theme.colors.grayLight};
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  padding: 0 70px;
`;
