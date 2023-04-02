import { CheckboxProps } from "primereact/checkbox";
import { FC, useState } from "react";
import { CheckedSvg } from "../SVGs/CheckedSvg";

import s from "./Checkbox.module.css";
import { Checkbox as PrimeCheckbox } from "primereact/checkbox";
import { useThemeProvider } from "src/providers/theme/ThemeProvider";

export const Checkbox: FC<
  Omit<CheckboxProps, "checked"> & {
    label?: string;
    checked?: boolean;
    value?: boolean;
    name: string;
    inputId: string;
  }
> = (props) => {
  const [checked, setChecked] = useState<boolean | undefined>(props.checked);
  const { themeMode } = useThemeProvider();

  const isChecked = Boolean(checked);

  return (
    <div
      className={`${
        themeMode === "dark"
          ? s.checkboxContainerDark
          : s.checkboxContainerLight
      } ${s.checkboxContainer}`}
    >
      <PrimeCheckbox
        icon={CheckedSvg}
        value={props.value}
        name={props.name}
        inputId={props.inputId}
        checked={isChecked}
        onChange={(e) => setChecked(e.checked)}
      />
      <label
        className={`${s.checkboxLabel} ${
          themeMode === "dark"
            ? s.checkboxLabelCheckedDark
            : s.checkboxLabelCheckedLight
        }`}
        htmlFor={props.inputId}
      >
        {props.label || "This is label"}
      </label>
    </div>
  );
};
