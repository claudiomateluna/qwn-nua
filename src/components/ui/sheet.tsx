'use client';

import * as React from 'react';
import { Drawer as VaulDrawer } from 'vaul';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const Sheet = VaulDrawer.Root;
const SheetTrigger = VaulDrawer.Trigger;
const SheetClose = VaulDrawer.Close;
const SheetTitle = VaulDrawer.Title;

// Definir variantes para la posición del drawer
const drawerVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out',
  {
    variants: {
      side: {
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

interface SheetContentProps
  extends React.ComponentProps<typeof VaulDrawer.Content>,
    VariantProps<typeof drawerVariants> {
  onClose?: () => void;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof VaulDrawer.Content>,
  SheetContentProps
>(({ side = 'right', className, children, onClose, ...props }, ref) => (
  <VaulDrawer.Portal>
    <VaulDrawer.Overlay 
      className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      onClick={onClose}
    />
    <VaulDrawer.Content
      ref={ref}
      className={cn(drawerVariants({ side }), className)}
      {...props}
    >
      <VaulDrawer.Title className="sr-only">Menú de navegación</VaulDrawer.Title>
      {children}
    </VaulDrawer.Content>
  </VaulDrawer.Portal>
));
SheetContent.displayName = VaulDrawer.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
};