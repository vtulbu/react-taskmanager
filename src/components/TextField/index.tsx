import { FC } from "react";
import { InputTextProps, InputText } from "primereact/inputtext";

import s from "./TextField.module.css";

type CustomTextFieldProps = {
  label?: string;
  error?: boolean;
  helperText?: string;
};

export const TextField: FC<InputTextProps & CustomTextFieldProps> = (props) => {
  return (
    <div className={s.textFieldContainer}>
      {props.label && (
        <label
          className={s.textFieldLabel}
          style={{
            fontSize: "12px",
            fontWeight: "700",
            lineHeight: "15px",
            color: "#828FA3",
          }}
        >
          {props.label}
        </label>
      )}
      <InputText {...props} className={s.textField} />
      {props.helperText && (
        <p className={`${s.helperText} ${props.error && s.error}`}>
          {props.helperText}
        </p>
      )}
    </div>
  );
};
