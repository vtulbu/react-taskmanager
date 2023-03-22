import styled from "@emotion/styled";
import { Dialog as PrimeDialog } from "primereact/dialog";

export const Dialog = styled(PrimeDialog)`
  && {
    position: relative;
    top: 80px;

    &.p-dialog .p-dialog-content {
      display: flex;
      padding: 0;
      width: 264px;
      height: fit-content;
      background-color: ${({ theme }) =>
        theme.mode === "dark" ? theme.colors.grayDark : theme.colors.white};
      box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
      border-radius: 8px;
    }
  }
`;
