import { FC } from "react";
import { useMatch } from "react-router-dom";

import { LogoSVG } from "../SVGs/LogoSvg";

import { DotMenu } from "..";
import { Button } from "../Button";
import { paths } from "../Sidebar/mockData";
import * as S from "./styled";
import { PlusSvg } from "../SVGs/PlusSvg";
import { LogoIconSvg } from "../SVGs/LogoIconSvg";
import { SidebarArrowSvg } from "../SVGs/SideBarArrowSvg";
import { useSidebar } from "src/providers/sidebar/SidebarProvider";

export const Header: FC = () => {
  const [, { handleSidebarState }] = useSidebar();
  const match = useMatch("boards/:id");
  const boardName = paths.find((path) => path.id === match?.params.id)?.label;

  return (
    <S.HeaderContainer>
      <S.LogoContainer>
        {window.innerWidth <= 768 ? <LogoIconSvg /> : <LogoSVG />}
      </S.LogoContainer>
      {window.innerWidth >= 769 && <S.Divider />}
      <S.HeaderTitleAndActions>
        <S.HeaderTitle
          onClick={() => {
            window.innerWidth <= 768 && handleSidebarState();
          }}
        >
          {boardName && <h2>{boardName}</h2>}
          {window.innerWidth <= 768 && <SidebarArrowSvg />}
        </S.HeaderTitle>

        <S.HeaderActions>
          <Button
            disabled
            label={window.innerWidth > 768 ? "+ Add New Task" : undefined}
            {...(window.innerWidth <= 768 && {
              icon: <PlusSvg />,
              padding: "10px 18px",
            })}
          />
          <DotMenu buttonVariant={{ text: true }} />
        </S.HeaderActions>
      </S.HeaderTitleAndActions>
    </S.HeaderContainer>
  );
};
