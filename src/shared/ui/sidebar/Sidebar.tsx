// src/shared/ui/SideBar/SideBar.tsx

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { SetStateAction } from "react"; // Утилита для объединения классов

// --- Стили для компонента с помощью CVA ---

const sidebarVariants = cva(
  "fixed z-50 gap-4 bg-white   shadow-lg transition ease-in-out bg-bg6 border-none py-1.2 px-4",
  {
    variants: {
      sizeVariant: {
        primary: "w-[84vw] md:w-[400px]",
        secondary: "w-full",
      },
      side: {
        left: "inset-y-0 left-0 h-full border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left ",
        right:
          "inset-y-0 right-0 h-full  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right ",
      },
    },
    defaultVariants: {
      side: "right",
      sizeVariant: "primary",
    },
  },
);

// --- Типизация пропсов ---

interface SideBarProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content>,
    VariantProps<typeof sidebarVariants> {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

// --- Компонент ---

export const SideBar: React.FC<SideBarProps> = ({
  side = "right",
  sizeVariant = "primary",
  className,
  trigger,
  title,
  description,
  children,
  open,
  setOpen,
  ...props
}) => (
  <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" />
      <Dialog.Content
        className={cn(
          sidebarVariants({
            side,
            sizeVariant,
          }),
          "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-in-from-left duration-200",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <Dialog.Title className="text-lg font-semibold text-gray-900">
            {title}
          </Dialog.Title>
          {description && (
            <Dialog.Description className="text-sm text-gray-500">
              {description}
            </Dialog.Description>
          )}
        </div>

        {/* Сюда будет вставлен контент сайдбара */}
        <div className="mt-4">{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
