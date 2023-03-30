import styled from '@emotion/styled';
import { rgba } from 'polished';
import { Button as PrimeButton, ButtonProps } from 'primereact/button';

type CustomButtonProps = ButtonProps & {
  color?: 'primary' | 'secondary';
  padding?: string;
};

export const Button = styled(PrimeButton)<CustomButtonProps>`
  && {
    ${({ theme, color }) => `
      ${
        theme.mode === 'light'
          ? `
        background-color: 
          ${
            color === 'secondary'
              ? rgba(theme.colors.primary, 0.1)
              : theme.colors.primary
          };
        color: ${
          color === 'secondary' ? theme.colors.primary : theme.colors.white
        };
      `
          : `
        background-color: 
            ${
              color === 'secondary' ? theme.colors.white : theme.colors.primary
            };
        color: ${
          color === 'secondary' ? theme.colors.primary : theme.colors.white
        };
        `
      }
      
    `}
  }
`;
