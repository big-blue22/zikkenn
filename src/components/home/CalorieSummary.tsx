'use client';

// ============================================================
// CalorieSummary — ホーム画面の円形プログレスバー
// ============================================================

import { motion } from 'framer-motion';
import ProgressRing from '@/components/ui/ProgressRing';

interface CalorieSummaryProps {
    totalCalories: number;
    goalCalories: number;
}

export default function CalorieSummary({ totalCalories, goalCalories }: CalorieSummaryProps) {
    const remaining = Math.max(0, goalCalories - totalCalories);
    const progress = goalCalories > 0 ? totalCalories / goalCalories : 0;
    const isOver = totalCalories > goalCalories;

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="bg-card rounded-3xl shadow-sm p-6 flex flex-col items-center"
        >
            <div className="relative">
                <ProgressRing
                    progress={progress}
                    label={isOver ? `${(totalCalories - goalCalories).toLocaleString()}kcal超過` : `${remaining.toLocaleString()}kcal`}
                    subLabel={isOver ? '⚠️ 超過' : '残り'}
                    size={180}
                    strokeWidth={14}
                />
            </div>
            <div className="mt-3 text-center">
                <p className="text-sm text-text-secondary">
                    <span className="font-bold text-text-primary text-lg">
                        {totalCalories.toLocaleString()}
                    </span>
                    {' / '}
                    {goalCalories.toLocaleString()} kcal
                </p>
            </div>
        </motion.div>
    );
}
