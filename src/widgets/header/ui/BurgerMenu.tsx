import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

interface BurgerMenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BurgerMenu = ({ children, trigger, open, setOpen }: BurgerMenuProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}  >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out bg-bg6 fixed top-0 left-0 z-50 h-screen w-screen max-w-md rounded-md p-6 duration-400">
          <Dialog.Title className="hidden">Menu</Dialog.Title>
          <Dialog.Close className="relative left-12/13" asChild>
            <svg
              className="bn-svg close-btn-size"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.697 4.575L4.575 6.697 9.88 12l-5.304 5.303 2.122 2.122L12 14.12l5.303 5.304 2.122-2.122L14.12 12l5.304-5.303-2.122-2.122L12 9.88 6.697 4.575z"
                fill="currentColor"
              ></path>
            </svg>
          </Dialog.Close>

          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
