import { title } from "process";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { Dialog } from "src/components/Dialog";

type DialogContextTypes = [
  { isDialogOpen: boolean },
  {
    openDialog: ({
      body,
      size,
    }: {
      body: ReactNode;
      size?: "small" | "medium";
      title?: string;
    }) => void;
    closeDialog: () => void;
  }
];

export const DialogContext = createContext<DialogContextTypes>([
  {
    isDialogOpen: false,
  },
  { openDialog: () => {}, closeDialog: () => {} },
]);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [element, setElement] = useState<ReactNode>();
  const [size, setSize] = useState<"small" | "medium">();
  const [title, setTitle] = useState<string>();

  const returnValues: DialogContextTypes = useMemo(() => {
    const openDialog = ({
      body,
      size,
      title,
    }: {
      body: ReactNode;
      size?: "small" | "medium";
      title?: string;
    }) => {
      setElement(body);
      setVisible(true);
      setSize(size);
      setTitle(title);
    };

    const closeDialog = () => {
      setVisible(false);
    };

    return [{ isDialogOpen: visible }, { openDialog, closeDialog }];
  }, [visible]);

  return (
    <DialogContext.Provider value={returnValues}>
      <Dialog
        title={title}
        size={size}
        visible={visible}
        dismissableMask
        onHide={() => setVisible(false)}
      >
        {element}
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
