import { DialogProps, Dialog as PrimeDialog } from "primereact/dialog";
import { useThemeProvider } from "src/providers/theme/ThemeProvider";

import s from "./Dialog.module.css";

type CustomDialogProps = {
  size?: "small" | "medium";
  isMenu?: boolean;
  title?: string;
};

export const Dialog = ({
  isMenu,
  title,
  children,
  ...restProps
}: DialogProps & CustomDialogProps) => {
  const { themeMode } = useThemeProvider();
  const classes = `${s.dialog} ${isMenu ? s.isMenu : ""} ${
    themeMode === "dark" ? s.dark : s.light
  }`;

  return (
    <PrimeDialog {...restProps} className={classes} showHeader={false}>
      <h2
        className={`${s.titleText} ${themeMode === "dark" && s.darkTitleText} ${
          isMenu && s.isMenu
        }`}
      >
        {title}
      </h2>
      {children}
    </PrimeDialog>
  );
};
