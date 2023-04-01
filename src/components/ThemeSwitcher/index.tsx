import { InputSwitch } from "primereact/inputswitch";
import { useThemeProvider } from "../../providers/theme/ThemeProvider";
import { DarkThemeSvg } from "../SVGs/DarkThemeSvg";
import { LightThemeSvg } from "../SVGs/LightThemeSvg";

import s from "./ThemeSwitcher.module.css";

export const ThemeSwitcher = () => {
  const { handleThemeMode, themeMode } = useThemeProvider();

  const checked = themeMode === "dark" ? true : false;

  return (
    <div className={s.themeSwitcher}>
      <LightThemeSvg />
      <InputSwitch
        className={s.inputSwitch}
        style={{ border: "none" }}
        aria-label="Switch Theme"
        checked={checked}
        onChange={() => handleThemeMode?.()}
      />
      <DarkThemeSvg />
    </div>
  );
};
