import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[var(--clr4)] text-[var(--clr1)] hover:bg-[color-mix(in_oklab, var(--clr4), white_20%)]',
        destructive: 'bg-[var(--clr6)] text-[var(--clr1)] hover:bg-[color-mix(in_oklab, var(--clr6), white_20%)]',
        outline: 'border border-[var(--clr4)] bg-transparent text-[var(--clr4)] hover:bg-[var(--clr4)] hover:text-[var(--clr1)]',
        secondary: 'bg-[var(--clr1)] text-[var(--clr4)] border border-[var(--clr4)] hover:bg-[color-mix(in_oklab, var(--clr4), white_90%)]',
        ghost: 'hover:bg-[color-mix(in_oklab, var(--clr4), white_95%)] hover:text-[var(--clr4)]',
        link: 'text-[var(--clr4)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        xl: 'h-12 px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };