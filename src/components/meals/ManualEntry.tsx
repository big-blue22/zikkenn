'use client';

// ============================================================
// ManualEntry — 食事の手動入力フォーム
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

interface ManualEntryProps {
    onAdd: (foodName: string, calories: number) => void;
}

export default function ManualEntry({ onAdd }: ManualEntryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!foodName.trim()) {
            setError('食品名を入力してください');
            return;
        }
        const cal = parseInt(calories);
        if (!cal || cal <= 0) {
            setError('カロリーを入力してください');
            return;
        }
        onAdd(foodName.trim(), cal);
        setFoodName('');
        setCalories('');
        setError('');
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-4 py-3 rounded-2xl bg-gray-50 hover:bg-gray-100
          transition-colors flex items-center gap-2 text-sm font-medium text-text-secondary
          min-h-[44px]"
            >
                <span>✏️</span>
                <span>手動で入力</span>
                <span className={`ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-3 space-y-3">
                            <input
                                type="text"
                                placeholder="食品名（例: チキンサラダ）"
                                value={foodName}
                                onChange={(e) => { setFoodName(e.target.value); setError(''); }}
                                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200
                  bg-white text-text-primary placeholder:text-gray-400
                  focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                  min-h-[44px]"
                            />
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="number"
                                        placeholder="カロリー"
                                        value={calories}
                                        onChange={(e) => { setCalories(e.target.value); setError(''); }}
                                        className="w-full px-4 py-3 pr-14 rounded-2xl border-2 border-gray-200
                      bg-white text-text-primary placeholder:text-gray-400
                      focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                      min-h-[44px]"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium text-sm">
                                        kcal
                                    </span>
                                </div>
                                <Button onClick={handleSubmit} size="md">
                                    追加
                                </Button>
                            </div>
                            {error && <p className="text-sm text-danger">{error}</p>}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
