import { FC } from "react";
import { ButtonProps } from "primereact/button";

import * as S from "./styled";

export const Button: FC<ButtonProps & { color?: "primary" | "secondary" }> = (
  props
) => {
  return <S.Button {...props} label="Test Button" />;
};
