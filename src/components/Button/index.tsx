import { ButtonProps } from "primereact/button";
import { FC } from "react";

import * as S from "./styled";

export const Button: FC<
  ButtonProps & { color?: "primary" | "secondary"; padding?: string }
> = (props) => {
  return <S.Button {...props}>{props.children}</S.Button>;
};
