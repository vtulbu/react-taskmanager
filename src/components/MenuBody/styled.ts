import styled from '@emotion/styled';
import { NavLink as RouterNavLink } from 'react-router-dom';

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  @media only screen and (max-width: 768px) {
    padding: 16px 0;
  }

  .hide-sidebar {
    font-weight: 700;
    font-size: 15px;
    line-height: 19px;
    color: var(--medium-grey);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px 6px;

    border-radius: var(--global-border-radius);
    margin: 20px 18px 0;
  }

  .hide-sidebar:hover {
    cursor: pointer;
    background-color: var(--hover-item-boards);
  }
`;

export const BoardsLabel = styled.p`
  font-family: 'Plus Jakarta Sans';
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

export const NavLink = styled(RouterNavLink)`
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
  gap: 16px;

  &:hover {
    background-color: var(--hover-item-boards);
  }

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
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    .p-button {
      display: none;
    }
    margin-top: 16px;
    margin-bottom: 0;
  }
`;

export const CreateBoardButton = styled.button`
  cursor: pointer;
  padding-left: 24px;
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
  gap: 16px;

  &:hover {
    background-color: var(--hover-item-boards);
  }

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
`;
