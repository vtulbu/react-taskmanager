import { DialogProps } from "primereact/dialog";

import * as S from "./styled";

export const Dialog = (props: DialogProps) => {
  return (
    <S.Dialog {...props} showHeader={false}>
      {props.children}
    </S.Dialog>
  );
};
