import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-[#2c3e50] to-[#ffc41d] text-white shadow-lg hover:shadow-xl hover:from-[#34495e] hover:to-[#e6b40d] transition-all duration-300 transform hover:-translate-y-0.5',
        destructive: 'bg-gradient-to-r from-[#e74c3c] to-[#c0392b] text-white hover:from-[#c0392b] hover:to-[#a93226]',
        outline: 'border-2 border-[#2c3e50] bg-transparent text-[#2c3e50] hover:bg-[#2c3e50] hover:text-white',
        secondary: 'bg-gradient-to-r from-[#ffc41d] to-[#f39c12] text-[#2c3e50] hover:from-[#e6b40d] hover:to-[#d68910]',
        ghost: 'hover:bg-[#ecf0f1] hover:text-[#2c3e50]',
        link: 'text-[#2c3e50] underline-offset-4 hover:underline',
        'gradient-primary': 'bg-gradient-to-r from-[#2c3e50] to-[#ffc41d] text-white shadow-lg hover:shadow-xl hover:from-[#34495e] hover:to-[#e6b40d] transition-all duration-300 transform hover:-translate-y-0.5',
        'gradient-secondary': 'bg-gradient-to-r from-[#ffc41d] to-[#e74c3c] text-white shadow-lg hover:shadow-xl hover:from-[#e6b40d] hover:to-[#c0392b] transition-all duration-300 transform hover:-translate-y-0.5',
        'gradient-tertiary': 'bg-gradient-to-r from-[#e74c3c] to-[#c0392b] text-white shadow-lg hover:shadow-xl hover:from-[#c0392b] hover:to-[#a93226] transition-all duration-300 transform hover:-translate-y-0.5',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-9 px-4 py-2 text-xs',
        lg: 'h-12 px-8 text-lg',
        xl: 'h-14 px-10 text-xl',
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