import styled from "@emotion/styled";
import { Button as PrimeButton, ButtonProps } from "primereact/button";
import { rgba } from "polished";

type CustomButtonProps = ButtonProps & {
  color?: "primary" | "secondary";
};

export const Button = styled(PrimeButton)<CustomButtonProps>`
  && {
    background-color: ${({ color, theme }) =>
      color === "secondary"
        ? rgba(theme.colors.primary, 0.1)
        : theme.colors.primary};
    color: ${({ color, theme }) =>
      color === "secondary" ? theme.colors.primary : theme.colors.white};
    border-radius: 50px;
    border: none;
    padding: 15px 61.5px;
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

    :hover {
      background-color: ${({ color = "primary" }) =>
        color && `var(--${color}-light)`};
    }
  }
`;
