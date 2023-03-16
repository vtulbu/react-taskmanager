export const theme = (themeMode: "light" | "dark") => ({
  colors: {
    primary: "#635FC7",
    primaryLight: "#A8A4FF",
    blackMain: "#000112",
    veryDarkGray: "#20212C",
    grayDark: "#2b2c37",
    grayMain: "#3e3f4e",
    grayLight: "#828fa3",
    whiteDark: "#e4ebfa",
    almostWhite: "#f4f7fd",
    white: "#ffffff",
    errorMain: "#ea5555",
    errorLight: "#ff9898",
  },
  mode: themeMode,
});

type Theme = ReturnType<typeof theme>;

export type { Theme };
