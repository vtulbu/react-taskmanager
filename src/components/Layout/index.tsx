import { ProgressSpinner } from 'primereact/progressspinner';
import { useThemeProvider } from 'src/providers/theme/ThemeProvider';
import { ReactNode, useEffect, useState } from 'react';
import { useSidebar } from 'src/providers/sidebar/SidebarProvider';
import { Button } from '../Button';
import { Header } from '../Header';
import { EyeOpen } from '../SVGs/EyeOpen';

import s from './Layout.module.css';
import { useScreenSize } from 'src/hooks';

export const Layout = ({ children }: { children: ReactNode }) => {
  const [loaded, setLoaded] = useState(false);
  const { isMobile } = useScreenSize();
  const [{ isSidebarOpen }, { handleSidebarState }] = useSidebar();
  const { themeMode } = useThemeProvider();

  const contentClassNames = `${s.content} ${
    isSidebarOpen && s.contentIsSidebarOpen
  } ${
    themeMode === 'dark' ? s.contentBackgroundDark : s.contentBackgroundLight
  }`;

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <>
      {!loaded && (
        <div className={s['loading-spinner']}>
          <ProgressSpinner />
        </div>
      )}
      <div className={s.layoutContainer}>
        <Header />
        <div className={contentClassNames}>
          {children}
          {!isMobile && (
            <div className={s.sidebarButton}>
              <Button
                style={{
                  width: '56px',
                  height: '56px',
                  padding: '0',
                  borderRadius: '0 100px 100px 0',
                }}
                icon={<EyeOpen />}
                onClick={handleSidebarState}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
