import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
    return (
        <div
            className={`
        bg-card rounded-2xl shadow-sm p-4
        ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]' : ''}
        ${className}
      `}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </div>
    );
}
