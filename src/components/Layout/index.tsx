import { ReactNode } from "react";
import * as S from "./styled";

export const Layout = ({ children }: { children: ReactNode }) => {
  return <S.LayoutContainer>{children}</S.LayoutContainer>;
};
