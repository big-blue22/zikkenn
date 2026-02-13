'use client';

// ============================================================
// FoodSearch — 食品マスタからのインクリメンタルサーチ
// ============================================================

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchFoods } from '@/data/foods';
import type { Food } from '@/types';

interface FoodSearchProps {
    onSelect: (food: Food) => void;
}

export default function FoodSearch({ onSelect }: FoodSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Food[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setIsOpen(false);
            return;
        }
        const found = searchFoods(query).slice(0, 10);
        setResults(found);
        setIsOpen(found.length > 0);
    }, [query]);

    // 外側クリックで閉じる
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleSelect = (food: Food) => {
        onSelect(food);
        setQuery('');
        setResults([]);
        setIsOpen(false);
        inputRef.current?.focus();
    };

    return (
        <div ref={containerRef} className="relative">
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">🔍</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => results.length > 0 && setIsOpen(true)}
                    placeholder="食品を検索..."
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200
            bg-white text-text-primary placeholder:text-gray-400
            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
            min-h-[44px] transition-colors"
                />
            </div>

            <AnimatePresence>
                {isOpen && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-20 left-0 right-0 mt-1 bg-white rounded-2xl shadow-lg
              border border-gray-100 max-h-[280px] overflow-y-auto"
                    >
                        {results.map((food, i) => (
                            <button
                                key={`${food.name}-${i}`}
                                onClick={() => handleSelect(food)}
                                className="w-full text-left px-4 py-3 hover:bg-primary/5
                  flex items-center justify-between min-h-[44px]
                  border-b border-gray-50 last:border-b-0
                  transition-colors"
                            >
                                <div>
                                    <p className="font-medium text-text-primary text-sm">{food.name}</p>
                                    <p className="text-xs text-text-secondary">{food.servingSize}</p>
                                </div>
                                <span className="text-sm font-semibold text-primary ml-3">
                                    {food.calories}kcal
                                </span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
