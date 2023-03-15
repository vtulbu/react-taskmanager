import styled from "@emotion/styled";
import { rgba } from "polished";
import { Checkbox as PrimeCheckbox } from "primereact/checkbox";

export const CheckboxContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 350px;
  height: 40px;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? theme.colors.veryDarkGray : theme.colors.whiteDark};
  border-radius: 4px;
  padding-left: 12px;
  transition: background-color 0.2s, color 0.2s;

  :hover {
    background-color: ${({ theme }) => rgba(theme.colors.primary, 0.25)};
  }
`;

export const Checkbox = styled(PrimeCheckbox)`
  && {
    font-family: "Plus Jakarta Sans";
    width: 16px;
    height: 16px;
    border-radius: 2px;

    .p-checkbox-box {
      width: 16px;
      height: 16px;
      border: 1px solid ${({ theme }) => rgba(theme.colors.grayLight, 0.25)};
      border-radius: 2px;
      ${({ theme }) =>
        theme.mode === "dark" &&
        `
          background-color: ${theme.colors.grayDark}; 
        `};
    }

    .p-checkbox-box.p-highlight {
      width: 16px;
      height: 16px;
      border: none;
      border-radius: 2px;
      background-color: ${({ theme }) => theme.colors.primary};
      border: none;
      position: absolute;

      .p-checkbox-icon {
        font-size: 8px;
        font-weight: 700;
      }
    }

    &:not(.p-checkbox-disabled) .p-checkbox-box {
      &.p-focus {
        border-radius: 2px;
        ${({ theme }) => `
           border: 1px solid ${rgba(theme.colors.grayLight, 0.25)}; 
        `};
        box-shadow: none;
      }

      &:hover {
        ${({ theme }) => `
           border: 1px solid ${rgba(theme.colors.grayLight, 0.25)}; 
        `};
      }

      &.p-highlight:hover {
        border: none;
        background: ${({ theme }) => theme.colors.primaryLight};
      }
    }
  }
`;

export const CheckboxLabel = styled.label<{ checked: boolean }>`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  ${({ checked, theme }) =>
    checked &&
    `
        text-decoration: line-through; 
        color: ${
          theme.mode === "dark"
            ? rgba(theme.colors.white, 0.5)
            : rgba(theme.colors.blackMain, 0.5)
        };
    `};
`;
