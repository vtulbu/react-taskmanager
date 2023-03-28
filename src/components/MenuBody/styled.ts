import styled from "@emotion/styled";
import { NavLink as RouterNavLink } from "react-router-dom";

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  @media only screen and (max-width: 768px) {
    padding: 16px 0;
  }
`;

export const BoardsLabel = styled.p`
  font-family: "Plus Jakarta Sans";
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 2.4px;
  color: ${({ theme }) => theme.colors.grayLight};
  margin: 32px 0 19px 24px;

  @media only screen and (max-width: 768px) {
    margin: 0px 0 19px 24px;
  }
`;

export const NavLinks = styled.div`
  display: grid;
  width: 100%;
`;

export const NavLink = styled(RouterNavLink)<{ asButton?: boolean }>`
  ${({ asButton }) =>
    asButton
      ? `
    button
  `
      : ``}

  .as-button {
    background-color: transparent;
    border: none;
    height: 48px;
    border-radius: 0 100px 100px 0;
    display: flex;
    width: calc(100% - 24px);
    padding-left: 24px;
    align-items: center;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 19px;
    font-family: "Plus Jakarta Sans";
    gap: 16px;
    width: 100%;
    padding: 0;

    @media only screen and (max-width: 768px) {
      gap: 12px;
    }
  }

  height: 48px;
  border-radius: 0 100px 100px 0;
  display: flex;
  width: calc(100% - 24px);
  padding-left: 24px;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.grayLight};
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  font-family: "Plus Jakarta Sans";
  gap: 16px;

  @media only screen and (max-width: 768px) {
    gap: 12px;
  }

  svg {
    path {
      fill: ${({ theme }) => theme.colors.grayLight};
    }
  }

  &.active {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};

    svg {
      path {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  }

  :last-child {
    .as-button {
      color: ${({ theme }) => theme.colors.primary};

      svg {
        path {
          fill: ${({ theme }) => theme.colors.primary};
        }
      }
    }
    &.active {
      .as-button {
        color: ${({ theme }) => theme.colors.white};
        background-color: ${({ theme }) => theme.colors.primary};

        svg {
          path {
            fill: ${({ theme }) => theme.colors.white};
          }
        }
      }
    }
  }
`;

export const SidebarActionContainer = styled.div`
  width: 100%;
  margin-bottom: 32px;
  display: grid;
  justify-items: center;
  gap: 16px;

  @media only screen and (max-width: 768px) {
    .p-button {
      display: none;
    }
    margin-top: 16px;
    margin-bottom: 0;
  }
`;
