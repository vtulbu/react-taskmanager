import { FC, useState } from "react";
import { DropdownProps } from "primereact/dropdown";
import * as S from "./styled";
import { DropdownIconSvg } from "./DropdownIconSvg";
import { useTheme } from "@emotion/react";

type CustomDropdownProps = {
  label?: string;
};

export const Dropdown: FC<DropdownProps & CustomDropdownProps> = (props) => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<string>();
  const panelStyle: DropdownProps["panelStyle"] = {
    backgroundColor:
      theme.mode === "dark" ? theme.colors.veryDarkGray : theme.colors.white,
    border: "none",
    boxShadow: "none",
  };

  const options: DropdownProps["options"] = [
    { label: "Test 1", value: "test-1" },
    { label: "Test 2", value: "test-2" },
  ];

  return (
    <S.DropdownContainer>
      <S.DropdownLabel>{props.label}</S.DropdownLabel>
      <S.Dropdown
        onChange={(e) => setSelectedOption(e.value)}
        {...props}
        value={selectedOption}
        options={options}
        panelStyle={panelStyle}
        dropdownIcon={DropdownIconSvg}
      />
    </S.DropdownContainer>
  );
};
