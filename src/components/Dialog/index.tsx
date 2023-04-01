import { DialogProps, Dialog as PrimeDialog } from "primereact/dialog";
import { useThemeProvider } from "src/providers/theme/ThemeProvider";

import s from "./Dialog.module.css";

type CustomDialogProps = {
  size?: "small" | "medium";
  isMenu?: boolean;
  title?: string;
};

export const Dialog = (props: DialogProps & CustomDialogProps) => {
  const { themeMode } = useThemeProvider();
  const classes = `${s.dialog} ${props.isMenu ? s.isMenu : ""} ${
    themeMode === "dark" ? s.dark : s.light
  }`;

  return (
    <PrimeDialog {...props} className={classes} showHeader={false}>
      <h2 className={s.titleText}>{props.title}</h2>
      {props.children}
    </PrimeDialog>
  );
};
