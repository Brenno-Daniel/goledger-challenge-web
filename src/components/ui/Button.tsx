'use client';

import { motion } from 'motion/react';
import { ButtonHTMLAttributes, forwardRef, MouseEventHandler } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon' | 'secondary';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center transition-all duration-150 ease-out';

    const variants = {
      primary: `px-6 py-2 bg-brand-primary text-brand-bg font-medium rounded-lg
                 hover:bg-transparent hover:text-white hover:border-white
                 border-2 border-brand-primary`,
      icon: `p-2 bg-brand-bg border border-white/20 rounded
              hover:bg-brand-primary hover:border-brand-primary
              group`,
      secondary: `px-6 py-2 bg-transparent text-white border border-white/20 rounded-lg
                   hover:bg-white/10`,
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        type={props.type || 'button'}
        disabled={props.disabled}
        onClick={props.onClick as MouseEventHandler<HTMLButtonElement>}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
