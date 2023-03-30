import { DialogProps } from "primereact/dialog";

import * as S from "./styled";

type CustomDialogProps = {
  size?: "small" | "medium";
  isMenu?: boolean;
  title?: string;
};

export const Dialog = (props: DialogProps & CustomDialogProps) => {
  return (
    <S.Dialog {...props} showHeader={false}>
      <S.TitleText>{props.title}</S.TitleText>
      {props.children}
    </S.Dialog>
  );
};
