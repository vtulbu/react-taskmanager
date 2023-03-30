import styled from "@emotion/styled";
import { rgba } from "polished";
import { InputTextarea } from "primereact/inputtextarea";

export const TextFieldContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

export const TextField = styled(InputTextarea)<{ error?: boolean }>`
  && {
    height: 112px;
    font-family: "Plus Jakarta Sans";
    font-weight: 500;
    font-size: 13px;
    line-height: 23px;
    background: none;
    color: ${({ theme }) =>
      theme.mode === "dark" ? theme.colors.white : theme.colors.blackMain};
    border: 1px solid
      ${({ theme, error }) =>
        error ? theme.colors.errorMain : rgba(theme.colors.grayLight, 0.25)};

    ::placeholder {
      color: ${({ theme }) => rgba(theme.colors.grayLight, 0.25)};
    }

    &.p-inputtext:enabled {
      &:focus {
        box-shadow: none;
        ${({ theme, error }) =>
          error && `border-color: ${theme.colors.errorMain}`};
      }

      ${({ theme, error }) =>
        `&:hover, &:focus {
         border-color: ${
           error ? theme.colors.errorMain : rgba(theme.colors.grayLight, 0.25)
         };
      }`}
    }
  }
`;

export const TextFieldLabel = styled.label`
  margin-bottom: 8px;
  font-family: "Plus Jakarta Sans";
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  ${({ theme }) => theme.mode === "light" && `color: ${theme.colors.grayLight}`}
`;

export const HelperText = styled.p<{ error?: boolean }>`
  position: absolute;
  right: 16px;
  top: 16px;
  color: ${({ theme, error }) => error && theme.colors.errorMain};
  font-weight: 500;
  font-size: 13px;
  line-height: 23px;
`;
