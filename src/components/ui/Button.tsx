import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center transition-all duration-300 ease-in-out';

    const variants = {
      primary: `px-6 py-2 bg-brand-primary text-brand-bg font-medium
                 hover:bg-transparent hover:text-white hover:border-white
                 border-2 border-brand-primary`,
      icon: `p-2 bg-brand-bg border border-white/20 rounded
             hover:bg-brand-primary hover:border-brand-primary
             group`,
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
