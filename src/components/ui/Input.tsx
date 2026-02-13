import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    suffix?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, suffix, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        className={`
              w-full px-4 py-3 rounded-2xl border-2
              bg-white text-text-primary
              placeholder:text-gray-400
              transition-colors duration-200
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
              min-h-[44px]
              ${error ? 'border-danger' : 'border-gray-200'}
              ${suffix ? 'pr-12' : ''}
              ${className}
            `}
                        {...props}
                    />
                    {suffix && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium">
                            {suffix}
                        </span>
                    )}
                </div>
                {error && (
                    <p className="text-sm text-danger mt-1">{error}</p>
                )}
            </div>
        );
    },
);

Input.displayName = 'Input';
export default Input;
