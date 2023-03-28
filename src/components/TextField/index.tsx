import { FC } from "react";
import { InputTextProps } from "primereact/inputtext";

import * as S from "./styled";

type CustomTextFieldProps = {
  label?: string;
  error?: boolean;
  helperText?: string;
};

export const TextField: FC<InputTextProps & CustomTextFieldProps> = (props) => {
  return (
    <S.TextFieldContainer>
      {props.label && <S.TextFieldLabel>{props.label}</S.TextFieldLabel>}
      <S.TextField {...props} />
      {props.helperText && (
        <S.HelperText error={props.error}>{props.helperText}</S.HelperText>
      )}
    </S.TextFieldContainer>
  );
};
