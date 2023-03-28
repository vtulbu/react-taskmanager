import styled from "@emotion/styled";
import { rgba } from "polished";
import { Button as PrimeButton, ButtonProps } from "primereact/button";

type CustomButtonProps = ButtonProps & {
  color?: "primary" | "secondary";
  padding?: string;
};

export const Button = styled(PrimeButton)<CustomButtonProps>`
  && {
    ${({ theme, color }) => `
      ${
        theme.mode === "light"
          ? `
        background-color: 
          ${
            color === "secondary"
              ? rgba(theme.colors.primary, 0.1)
              : theme.colors.primary
          };
        color: ${
          color === "secondary" ? theme.colors.primary : theme.colors.white
        };
      `
          : `
        background-color: 
            ${
              color === "secondary" ? theme.colors.white : theme.colors.primary
            };
        color: ${
          color === "secondary" ? theme.colors.primary : theme.colors.white
        };
        `
      }
      
    `}
    /* background-color: ${({ color, theme }) =>
      color === "secondary"
        ? rgba(theme.colors.primary, 0.1)
        : theme.colors.primary};
    color: ${({ color, theme }) =>
      color === "secondary" ? theme.colors.primary : theme.colors.white}; */
    border-radius: 50px;
    border: none;
    padding: ${({ padding }) => (padding ? padding : "15px 36px")};
    font-family: "Plus Jakarta Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 19px;

    ${({ size }) =>
      size === "small" &&
      `
        padding: 8px 70px;
        font-weight: 700;
        font-size: 13px;
        line-height: 23px;
    `}

    &.p-button.p-button-icon-only {
      padding: ${({ padding }) => (padding ? padding : "15px 36px")};
    }

    :hover {
      background-color: ${({ color = "primary" }) =>
        color && `var(--${color}-light)`};
    }
  }
`;
