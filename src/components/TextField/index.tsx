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
      <S.TextFieldLabel>{props.label}</S.TextFieldLabel>
      <S.TextField {...props} placeholder="test placeholder" />
      <S.HelperText error={props.error}>{props.helperText}</S.HelperText>
    </S.TextFieldContainer>
  );
};
