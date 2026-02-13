'use client';

// ============================================================
// WeightInput — 体重入力コンポーネント
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

interface WeightInputProps {
    currentValue?: number;
    onSubmit: (weight: number) => void;
}

export default function WeightInput({ currentValue, onSubmit }: WeightInputProps) {
    const [weight, setWeight] = useState(currentValue ? String(currentValue) : '');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        const w = parseFloat(weight);
        if (!w || w <= 0 || w > 300) return;
        onSubmit(w);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
    };

    return (
        <div className="bg-card rounded-3xl shadow-sm p-6">
            {currentValue ? (
                <div className="text-center mb-4">
                    <p className="text-sm text-text-secondary">今日の記録</p>
                    <p className="text-4xl font-bold text-text-primary">{currentValue} <span className="text-lg font-normal text-text-secondary">kg</span></p>
                </div>
            ) : (
                <div className="text-center mb-4">
                    <p className="text-sm text-text-secondary">今日はまだ未記録</p>
                    <p className="text-2xl font-bold text-text-primary mt-1">体重を記録しましょう ⚖️</p>
                </div>
            )}

            <div className="flex gap-2">
                <div className="relative flex-1">
                    <input
                        type="number"
                        step="0.1"
                        placeholder="例: 70.0"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-gray-200
              bg-white text-text-primary text-lg font-semibold
              placeholder:text-gray-400 placeholder:font-normal
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
              min-h-[44px]"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium">
                        kg
                    </span>
                </div>
                <Button onClick={handleSubmit} disabled={!weight}>
                    記録
                </Button>
            </div>

            {submitted && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-success font-medium mt-3"
                >
                    ✅ 記録しました！
                </motion.p>
            )}
        </div>
    );
}
