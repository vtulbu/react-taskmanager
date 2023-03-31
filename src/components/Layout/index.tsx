import { ReactNode } from 'react';
import { useSidebar } from 'src/providers/sidebar/SidebarProvider';
import { Button } from '../Button';
import { Header } from '../Header';
import { EyeOpen } from '../SVGs/EyeOpen';

import * as S from './styled';

export const Layout = ({ children }: { children: ReactNode }) => {
  const [{ isSidebarOpen }, { handleSidebarState }] = useSidebar();

  return (
    <S.LayoutContainer>
      <Header />
      <S.Content isSidebarOpen={isSidebarOpen}>
        {children}
        {window.innerWidth > 768 && (
          <S.SidebarButton>
            <Button
              icon={<EyeOpen />}
              padding='0'
              onClick={handleSidebarState}
            />
          </S.SidebarButton>
        )}
      </S.Content>
    </S.LayoutContainer>
  );
};
