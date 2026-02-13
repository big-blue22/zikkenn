'use client';

// ============================================================
// MealList — 記録済み食事の一覧（削除可能）
// ============================================================

import { motion, AnimatePresence } from 'framer-motion';
import type { Meal } from '@/types';

interface MealListProps {
    meals: Meal[];
    onRemove: (id: string) => void;
}

export default function MealList({ meals, onRemove }: MealListProps) {
    if (meals.length === 0) {
        return (
            <div className="text-center py-8 text-text-secondary">
                <p className="text-3xl mb-2">🍽️</p>
                <p className="text-sm">まだ記録がありません</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <AnimatePresence mode="popLayout">
                {meals.map((meal) => (
                    <motion.div
                        key={meal.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between bg-white rounded-2xl p-3
              border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            {meal.photoDataUrl && (
                                <img
                                    src={meal.photoDataUrl}
                                    alt={meal.foodName}
                                    className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                                />
                            )}
                            <div className="min-w-0">
                                <p className="font-medium text-sm text-text-primary truncate">
                                    {meal.foodName}
                                </p>
                                <p className="text-xs text-text-secondary">
                                    {meal.calories} kcal
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => onRemove(meal.id)}
                            className="text-text-secondary hover:text-danger transition-colors
                p-2 rounded-xl hover:bg-danger/10 min-h-[44px] min-w-[44px]
                flex items-center justify-center flex-shrink-0"
                            aria-label="削除"
                        >
                            🗑️
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
