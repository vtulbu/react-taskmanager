import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { Dialog } from 'src/components';
import { MenuBody } from 'src/components/MenuBody';
import { Sidebar } from 'src/components/Sidebar';
import { useScreenSize } from 'src/hooks';

type SidebarContextTypes = [
  { isSidebarOpen: boolean },
  { handleSidebarState: () => void }
];

export const SidebarContext = createContext<SidebarContextTypes>([
  {
    isSidebarOpen: false,
  },
  { handleSidebarState: () => {} },
]);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const { isMobile } = useScreenSize();

  const returnValues: SidebarContextTypes = useMemo(() => {
    const handleSidebarState = () => {
      setVisible((prevValue) => !prevValue);
    };

    return [{ isSidebarOpen: visible }, { handleSidebarState }];
  }, [visible]);

  return (
    <SidebarContext.Provider value={returnValues}>
      <div>
        {!isMobile ? (
          <Sidebar visible={visible} onHide={() => setVisible(false)}>
            <MenuBody />
          </Sidebar>
        ) : (
          <Dialog
            isMenu
            size='small'
            style={{ width: '234px', padding: 0 }}
            visible={visible}
            position='top'
            onHide={() => setVisible(false)}
          >
            <MenuBody />
          </Dialog>
        )}
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
