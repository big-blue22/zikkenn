'use client';

import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    fullWidth?: boolean;
}

const variantStyles = {
    primary:
        'bg-primary text-white hover:bg-primary-dark active:scale-[0.97] shadow-md',
    secondary:
        'bg-secondary text-white hover:opacity-90 active:scale-[0.97] shadow-md',
    outline:
        'border-2 border-primary text-primary hover:bg-primary/10 active:scale-[0.97]',
    ghost:
        'text-text-secondary hover:bg-gray-100 active:scale-[0.97]',
    danger:
        'bg-danger text-white hover:opacity-90 active:scale-[0.97] shadow-md',
};

const sizeStyles = {
    sm: 'px-3 py-2 text-sm rounded-xl',
    md: 'px-5 py-3 text-base rounded-2xl',
    lg: 'px-6 py-4 text-lg rounded-2xl',
};

export default function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    return (
        <motion.button
            whileTap={{ scale: disabled ? 1 : 0.96 }}
            className={`
        font-semibold transition-colors duration-200
        flex items-center justify-center gap-2
        min-h-[44px]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
            disabled={disabled}
            {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
        >
            {children}
        </motion.button>
    );
}
