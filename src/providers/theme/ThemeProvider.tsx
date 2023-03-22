import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@emotion/react";

import { dark } from "../../styles/themes/dark";
import { light } from "../../styles/themes/light";
import { theme } from "../../styles/themes/theme";

const handleRawStyleChange = (themeMode: string, theme: string) => {
  const style = document.createElement("style");
  document.head.appendChild(style);
  document
    .querySelectorAll(
      `[theme-mode="${themeMode === "dark" ? "light" : "dark"}"]`
    )
    .forEach((e) => e.remove());
  style.setAttribute("theme-mode", themeMode);
  style.innerHTML = theme;
};

const ThemeContext = createContext<{
  themeMode: "light" | "dark";
  handleThemeMode?: () => void;
}>({ themeMode: "dark" });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const cachedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const hasStyles = Boolean(
      document.querySelectorAll(`[theme-mode="${cachedTheme}"]`).length
    );

    if (cachedTheme === "light") {
      setThemeMode("light");
      !hasStyles && handleRawStyleChange("light", light);
    } else {
      setThemeMode("dark");
      !hasStyles && handleRawStyleChange("dark", dark);
    }
  }, [cachedTheme]);

  const providerValues = useMemo(() => {
    const handleThemeMode = () => {
      setThemeMode((prevValue) => {
        if (prevValue === "dark") {
          localStorage.setItem("theme", "light");
          return "light";
        }
        localStorage.setItem("theme", "dark");
        return "dark";
      });
    };

    return { themeMode, handleThemeMode };
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={providerValues}>
      <MuiThemeProvider theme={theme(themeMode)}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeProvider = () => useContext(ThemeContext);
