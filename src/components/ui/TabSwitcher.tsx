'use client';

import { motion } from 'framer-motion';

interface Tab {
    key: string;
    label: string;
    icon?: string;
}

interface TabSwitcherProps {
    tabs: Tab[];
    activeKey: string;
    onTabChange: (key: string) => void;
}

export default function TabSwitcher({ tabs, activeKey, onTabChange }: TabSwitcherProps) {
    return (
        <div className="flex bg-gray-100 rounded-2xl p-1 gap-1">
            {tabs.map((tab) => {
                const isActive = tab.key === activeKey;
                return (
                    <button
                        key={tab.key}
                        onClick={() => onTabChange(tab.key)}
                        className={`
              relative flex-1 py-2.5 px-3 rounded-xl text-sm font-medium
              transition-colors duration-200 min-h-[44px]
              flex items-center justify-center gap-1
              ${isActive ? 'text-text-primary' : 'text-text-secondary'}
            `}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="tab-bg"
                                className="absolute inset-0 bg-white rounded-xl shadow-sm"
                                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                            />
                        )}
                        <span className="relative z-10">
                            {tab.icon && <span className="mr-1">{tab.icon}</span>}
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
