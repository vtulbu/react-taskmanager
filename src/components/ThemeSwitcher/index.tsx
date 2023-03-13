import { InputSwitch } from "primereact/inputswitch";
import { useThemeProvider } from "../../providers/theme/ThemeProvider";

export const ThemeSwitcher = () => {
  const { handleThemeMode, themeMode } = useThemeProvider();

  const checked = themeMode === "dark" ? true : false;

  return (
    <InputSwitch
      aria-label="Switch Theme"
      checked={checked}
      onChange={() => handleThemeMode?.()}
    />
  );
};
