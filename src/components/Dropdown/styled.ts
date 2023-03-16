import styled from "@emotion/styled";
import { rgba } from "polished";
import { Dropdown as PrimeDropdown } from "primereact/dropdown";

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: space-between;
  position: relative;
`;

export const Dropdown = styled(PrimeDropdown)`
  && {
    height: 40px;
    font-family: "Plus Jakarta Sans";
    font-weight: 500;
    font-size: 13px;
    line-height: 23px;
    background: none;
    border: 1px solid ${({ theme }) => rgba(theme.colors.grayLight, 0.25)};

    &:not(.p-disabled) {
      &.p-focus {
        box-shadow: none;
        border: 1px solid ${({ theme }) => theme.colors.primary};
      }

      &:hover {
        border: 1px solid ${({ theme }) => theme.colors.primaryLight};
      }
    }

    .p-dropdown-label.p-placeholder {
      padding: 0.5rem 0.75rem;
      font-weight: 500;
      font-size: 13px;
      line-height: 23px;
      color: ${({ theme }) => rgba(theme.colors.grayLight, 0.25)};
    }

    .p-inputtext {
      padding: 0.5rem 0.75rem;
      font-weight: 500;
      font-size: 13px;
      line-height: 23px;
      color: ${({ theme }) =>
        theme.mode === "dark" ? theme.colors.white : theme.colors.blackMain};
    }
  }
`;

export const DropdownLabel = styled.label`
  font-family: "Plus Jakarta Sans";
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  ${({ theme }) => theme.mode === "light" && `color: ${theme.colors.grayLight}`}
`;
