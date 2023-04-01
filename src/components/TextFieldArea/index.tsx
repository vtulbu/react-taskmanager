import { FC } from "react";
import { InputTextareaProps, InputTextarea } from "primereact/inputtextarea";

import s from "./TextFieldArea.module.css";

type CustomTextFieldProps = {
  label?: string;
  error?: boolean;
  helperText?: string;
};

export const TextFieldArea: FC<InputTextareaProps & CustomTextFieldProps> = (
  props
) => {
  return (
    <div className={s.textFieldContainer}>
      {props.label && <label className={s.textFieldLabel}>{props.label}</label>}
      <InputTextarea {...props} className={s.textField} />
      {props.helperText && (
        <p className={`${s.helperText} ${props.error && s.error}`}>
          {props.helperText}
        </p>
      )}
    </div>
  );
};
