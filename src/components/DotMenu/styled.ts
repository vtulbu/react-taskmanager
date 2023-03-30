import styled from '@emotion/styled';

export const Container = styled.div`
  .icon-button {
    background-color: transparent;
    padding: 0;
  }
`;

export const ContentOverlay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ButtonMenu = styled.button`
  font-size: 13px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0px;
  color: #828fa3;
  cursor: pointer;

  &.red {
    color: #ea5555;
  }
`;
