import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-[0_4px_15px_rgba(99,102,241,0.3)] border border-white/10',
    secondary: 'bg-surface-800 hover:bg-surface-700 text-surface-100 border border-surface-700',
    danger: 'bg-danger-500/20 hover:bg-danger-500/30 text-danger-400 border border-danger-500/30',
    ghost: 'hover:bg-surface-800 text-surface-400 hover:text-surface-100'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
