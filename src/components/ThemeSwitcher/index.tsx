import { InputSwitch } from "primereact/inputswitch";
import { useThemeProvider } from "../../providers/theme/ThemeProvider";
import { DarkThemeSvg } from "../SVGs/DarkThemeSvg";
import { LightThemeSvg } from "../SVGs/LightThemeSvg";

import * as S from "./styled";

export const ThemeSwitcher = () => {
  const { handleThemeMode, themeMode } = useThemeProvider();

  const checked = themeMode === "dark" ? true : false;

  return (
    <S.ThemeSwitcherContainer>
      <LightThemeSvg />
      <InputSwitch
        style={{ border: "none" }}
        aria-label="Switch Theme"
        checked={checked}
        onChange={() => handleThemeMode?.()}
      />
      <DarkThemeSvg />
    </S.ThemeSwitcherContainer>
  );
};
