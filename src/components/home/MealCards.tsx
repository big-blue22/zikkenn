'use client';

// ============================================================
// MealCards — ホーム画面の4食事カード
// ============================================================

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import type { MealType } from '@/types';

interface MealCardData {
    type: MealType;
    icon: string;
    label: string;
    calories: number;
}

interface MealCardsProps {
    mealData: MealCardData[];
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function MealCards({ mealData }: MealCardsProps) {
    const router = useRouter();

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-3"
        >
            {mealData.map((meal) => (
                <motion.div key={meal.type} variants={item}>
                    <Card
                        onClick={() => router.push('/meals')}
                        className="text-center hover:border-primary/30 border-2 border-transparent transition-all"
                    >
                        <span className="text-2xl block mb-1">{meal.icon}</span>
                        <p className="text-xs font-medium text-text-secondary mb-0.5">{meal.label}</p>
                        <p className="text-sm font-bold text-text-primary">
                            {meal.calories > 0 ? `${meal.calories}kcal` : '---'}
                        </p>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}
