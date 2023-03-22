import { SidebarProps } from "primereact/sidebar";

import * as S from "./styled";

export const Sidebar = (props: SidebarProps) => {
  return (
    <S.Sidebar
      {...props}
      maskStyle={{ position: "absolute" }}
      modal={false}
      dismissable={false}
      style={window.innerWidth > 768 ? { position: "absolute" } : undefined}
      showCloseIcon={false}
    >
      {props.children}
    </S.Sidebar>
  );
};
