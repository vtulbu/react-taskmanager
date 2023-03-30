import { useTheme } from "@emotion/react";
import { DropdownProps } from "primereact/dropdown";
import { FC } from "react";
import { DropdownIconSvg } from "../SVGs/DropdownIconSvg";
import * as S from "./styled";

type CustomDropdownProps = {
  label?: string;
};

export const Dropdown: FC<DropdownProps & CustomDropdownProps> = (props) => {
  const theme = useTheme();
  const panelStyle: DropdownProps["panelStyle"] = {
    backgroundColor:
      theme.mode === "dark" ? theme.colors.veryDarkGray : theme.colors.white,
    border: "none",
    boxShadow: "none",
  };

  return (
    <S.DropdownContainer>
      <S.DropdownLabel>{props.label}</S.DropdownLabel>
      <S.Dropdown
        {...props}
        panelStyle={panelStyle}
        dropdownIcon={DropdownIconSvg}
      />
    </S.DropdownContainer>
  );
};
