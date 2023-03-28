import { FC } from "react";
import { InputTextareaProps } from "primereact/inputtextarea";

import * as S from "./styled";

type CustomTextFieldProps = {
  label?: string;
  error?: boolean;
  helperText?: string;
};

export const TextFieldArea: FC<InputTextareaProps & CustomTextFieldProps> = (
  props
) => {
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
