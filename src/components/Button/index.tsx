import { FC } from "react";
import { ButtonProps } from "primereact/button";

import * as S from "./styled";

export const Button: FC<ButtonProps> = (props) => {
  return <S.Button {...props} label="Test Button" />;
};
