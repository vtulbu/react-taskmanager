import { ReactNode } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useSidebar } from "src/providers/sidebar/SidebarProvider";
import { Button } from "../Button";
import { Header } from "../Header";
import { EyeOpen } from "../SVGs/EyeOpen";

import * as S from "./styled";

export const Layout = ({ children }: { children: ReactNode }) => {
  const [{ isSidebarOpen }, { handleSidebarState }] = useSidebar();
  const { width, ref } = useResizeDetector();

  return (
    <S.LayoutContainer ref={ref}>
      <Header />
      <S.Content isSidebarOpen={isSidebarOpen}>
        {children}
        {width && width > 768 && (
          <S.SidebarButton>
            <Button
              icon={<EyeOpen />}
              padding="0"
              onClick={handleSidebarState}
            />
          </S.SidebarButton>
        )}
      </S.Content>
    </S.LayoutContainer>
  );
};
