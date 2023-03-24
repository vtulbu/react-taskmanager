import { ButtonProps } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Toast } from "primereact/toast";
import { FC, useRef } from "react";

import { Button } from "../Button";
import { ActionMenuDots } from "../SVGs/ActionMenuDots";

type DotMenuProps = {
  buttonVariant?: {
    text?: ButtonProps["text"];
    outlined?: ButtonProps["outlined"];
  };
};

export const DotMenu: FC<DotMenuProps> = ({ buttonVariant }) => {
  const menu = useRef<Menu>(null);
  const toast = useRef<Toast>(null);
  const items: MenuItem[] = [
    {
      label: "Options",
    },
    {
      label: "Navigate",
    },
  ];

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast}></Toast>
      <Menu model={items} popup ref={menu} />
      <Button
        icon={<ActionMenuDots />}
        {...buttonVariant}
        onClick={(e) => menu.current?.toggle(e)}
        padding="0"
        style={{ height: "3rem" }}
      />
    </div>
  );
};
