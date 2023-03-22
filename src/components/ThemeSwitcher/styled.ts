import styled from "@emotion/styled";

export const ThemeSwitcherContainer = styled.div`
  background-color: ${({ theme }) =>
    theme.mode === "dark"
      ? theme.colors.veryDarkGray
      : theme.colors.almostWhite};
  display: flex;
  gap: 24px;
  width: 86%;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;

  .p-inputswitch {
    height: 20px;
    width: 40px;
  }

  .p-inputswitch:not(.p-disabled) .p-inputswitch-slider,
  .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider,
  .p-inputswitch.p-inputswitch-checked:not(.p-disabled) .p-inputswitch-slider {
    background: ${({ theme }) => theme.colors.primary};
    box-shadow: none;

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
    }
  }

  .p-inputswitch .p-inputswitch-slider:before {
    width: 14px;
    height: 14px;
    left: 2px;
    margin-top: -7px;
  }

  .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider:before {
    transform: translateX(20px);

    &:hover {
      transform: translateX(14px);
    }
  }
`;
