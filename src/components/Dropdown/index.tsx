import { useThemeProvider } from "src/providers/theme/ThemeProvider";
import { DropdownProps, Dropdown as PrimeDropdown } from "primereact/dropdown";
import { FC } from "react";
import { DropdownIconSvg } from "../SVGs/DropdownIconSvg";
import s from "./Dropdown.module.css";

type CustomDropdownProps = {
  label?: string;
};

export const Dropdown: FC<DropdownProps & CustomDropdownProps> = (props) => {
  const { themeMode } = useThemeProvider();
  const panelStyle: DropdownProps["panelStyle"] = {
    backgroundColor: themeMode === "dark" ? "#20212C" : "#fff",
    border: "none",
    boxShadow: "none",
  };

  return (
    <div className={s.dropdownContainer}>
      <div
        className={`${s.dropdownLabel} ${
          themeMode === "dark" ? s.dropdownLabelDark : ""
        }`}
        style={{
          fontSize: "12px",
          fontWeight: "700",
          lineHeight: "15px",
          color: "#828FA3",
        }}
      >
        {props.label}
      </div>
      <PrimeDropdown
        {...props}
        panelStyle={panelStyle}
        dropdownIcon={DropdownIconSvg}
      />
    </div>
  );
};
