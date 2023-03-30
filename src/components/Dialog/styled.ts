import styled from '@emotion/styled';
import { Dialog as PrimeDialog } from 'primereact/dialog';

export const Dialog = styled(PrimeDialog)<{
  size?: 'small' | 'medium';
  isMenu?: boolean;
}>`
  && {
    position: relative;
    ${({ isMenu }) => isMenu && `top: 80px`};

    &.p-dialog .p-dialog-content {
      display: flex;
      flex-direction: column;
      padding: 24px;
      ${({ isMenu }) => isMenu && `padding: 0;`};
      width: ${({ size }) => {
        switch (size) {
          case 'small':
            return '343px';
          case 'medium':
            return '480px';
        }
      }};
      height: fit-content;
      background-color: ${({ theme }) =>
        theme.mode === 'dark' ? theme.colors.grayDark : theme.colors.white};
      box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
      border-radius: 8px;
    }

    @media (min-width: 768px) {
      &.p-dialog .p-dialog-content {
        padding: 32px;
      }
    }
  }
`;

export const TitleText = styled.h2`
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  margin: 0;
`;
