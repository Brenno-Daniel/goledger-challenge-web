import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm text-brand-primary">{label}</label>}
        <input
          ref={ref}
          className={`px-4 py-2 bg-brand-bg border border-white/20 rounded
                      text-white placeholder:text-white/40
                      focus:outline-none focus:border-brand-primary
                      transition-colors duration-200
                      ${error ? 'border-red-500' : ''}
                      ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
