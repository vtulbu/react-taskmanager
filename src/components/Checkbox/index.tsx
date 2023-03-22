import { CheckboxProps } from "primereact/checkbox";
import { FC, useState } from "react";
import { CheckedSvg } from "../SVGs/CheckedSvg";
import * as S from "./styled";

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

  return (
    <S.CheckboxContainer>
      <S.Checkbox
        icon={CheckedSvg}
        value={props.value}
        name={props.name}
        inputId={props.inputId}
        checked={Boolean(checked)}
        onChange={(e) => setChecked(e.checked)}
      />
      <S.CheckboxLabel checked={Boolean(checked)} htmlFor={props.inputId}>
        {props.label || "This is label"}
      </S.CheckboxLabel>
    </S.CheckboxContainer>
  );
};
