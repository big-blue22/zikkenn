'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const tabs = [
    { href: '/', label: 'ホーム', icon: '🏠' },
    { href: '/meals', label: '食事', icon: '🍽️' },
    { href: '/weight', label: '体重', icon: '⚖️' },
    { href: '/settings', label: '設定', icon: '⚙️' },
] as const;

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 shadow-lg">
            <div className="max-w-[480px] mx-auto flex items-center justify-around h-[72px] px-2">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className="flex flex-col items-center justify-center gap-0.5 flex-1 min-h-[44px] relative"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -top-0.5 w-8 h-1 bg-primary rounded-full"
                                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                                />
                            )}
                            <motion.span
                                className="text-xl"
                                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ duration: 0.3 }}
                            >
                                {tab.icon}
                            </motion.span>
                            <span
                                className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-text-secondary'
                                    }`}
                            >
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
