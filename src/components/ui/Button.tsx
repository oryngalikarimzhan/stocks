import React from 'react';
import { twMerge } from 'tailwind-merge';

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-prime',
  muted: 'bg-muted',
};

const sizeClasses: Record<ButtonSize, string> = {
  md: 'w-fit h-8 px-2',
  lg: 'w-fit h-10 px-4',
  auto: 'h-auto w-auto',
};

type ButtonVariant = 'default' | 'muted';
type ButtonSize = 'md' | 'lg' | 'auto';

type ButtonUIProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  hasBorder?: boolean;
};

export function getButtonClassNames({
  variant = 'default',
  size = 'lg',
  hasBorder = true,
}: ButtonUIProps = {}): string {
  return twMerge(
    'flex items-center justify-center text-sm text-white font-medium shadow-sm rounded-md',
    variantClasses[variant],
    sizeClasses[size],
    hasBorder && variant === 'default' && 'border border-white',
    hasBorder && variant === 'muted' && 'border border-white/50'
  );
}

interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonUIProps {
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ children, className, variant, size, hasBorder, ...props }, ref) => {
    const classNames = getButtonClassNames({ variant, size, hasBorder });

    return (
      <button ref={ref} className={twMerge(classNames, className, props.disabled && 'disabled')} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
