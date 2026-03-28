import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Input = forwardRef(({ className, error, label, id, icon: Icon, wrapperClassName, ...props }, ref) => {
  return (
    <div className={cn("w-full", wrapperClassName)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-surface-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-surface-500" />
          </div>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "flex h-10 w-full rounded-lg border border-surface-700 bg-surface-900/50 px-3 py-2 text-sm text-surface-100 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            Icon && "pl-9",
            error && "border-danger-500/50 focus:ring-danger-500/50 focus:border-danger-500/50",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-danger-400 animate-slide-in">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
