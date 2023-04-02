import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const THEME = "theme" as const;
const LIGHT = "light" as const;
const DARK = "dark" as const;

type ThemeMode = typeof LIGHT | typeof DARK;

const ThemeContext = createContext<{
  themeMode: typeof LIGHT | typeof DARK;
  handleThemeMode?: () => void;
}>({ themeMode: DARK });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const cachedTheme = (localStorage.getItem(THEME) || LIGHT) as ThemeMode;
  const [themeMode, setThemeMode] = useState<ThemeMode>(cachedTheme);

  const providerValues = useMemo(() => {
    const handleThemeMode = () => {
      setThemeMode((prevValue) => {
        if (prevValue === DARK) {
          localStorage.setItem(THEME, LIGHT);
          return LIGHT;
        }
        localStorage.setItem(THEME, DARK);
        return DARK;
      });
    };

    return { themeMode, handleThemeMode };
  }, [themeMode]);

  useEffect(() => {
    const isStylesheetCreated = document.getElementById("theme-link");

    if (!isStylesheetCreated) {
      const link = document.createElement("link");
      link.setAttribute("id", "theme-link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", `/themes/${themeMode}.css`);
      document.head.appendChild(link);
    }

    if (isStylesheetCreated) {
      isStylesheetCreated.setAttribute("href", `/themes/${themeMode}.css`);
    }
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={providerValues}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeProvider = () => useContext(ThemeContext);
