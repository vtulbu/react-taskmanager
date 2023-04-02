import { ButtonProps, Button as PrimeButton } from "primereact/button";
import { FC } from "react";
import { useThemeProvider } from "src/providers/theme/ThemeProvider";

import s from "./Button.module.css";

export const Button: FC<
  ButtonProps & { color?: "primary" | "secondary"; padding?: string }
> = (props) => {
  const { themeMode } = useThemeProvider();

  const buttonClassNames = () => {
    if (themeMode === "dark") {
      if (props.color === "primary") {
        return `${s["p-button-primary-dark"]}`;
      }
      if (props.color === "secondary") {
        return `${s["p-button-secondary-dark"]}`;
      }
    }
    if (themeMode === "light") {
      if (props.color === "primary") {
        return `${s["p-button-primary-light"]}`;
      }
      if (props.color === "secondary") {
        return `${s["p-button-secondary-light"]}`;
      }
    }
    return "";
  };

  return (
    <PrimeButton {...props} className={`${buttonClassNames()} ${s.noBorder}`}>
      {props.children}
    </PrimeButton>
  );
};
