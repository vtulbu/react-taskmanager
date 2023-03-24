import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { Dialog } from "src/components/Dialog";

type DialogContextTypes = [
  { isDialogOpen: boolean },
  { openDialog: () => void; closeDialog: () => void }
];

export const DialogContext = createContext<DialogContextTypes>([
  {
    isDialogOpen: false,
  },
  { openDialog: () => {}, closeDialog: () => {} },
]);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);

  const returnValues: DialogContextTypes = useMemo(() => {
    const openDialog = () => {
      setVisible(true);
    };

    const closeDialog = () => {
      setVisible(false);
    };

    return [{ isDialogOpen: visible }, { openDialog, closeDialog }];
  }, [visible]);

  return (
    <DialogContext.Provider value={returnValues}>
      <Dialog visible={visible} onHide={() => setVisible(false)} />
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
