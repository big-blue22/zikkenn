'use client';

// ============================================================
// オンボーディング（初回セットアップ）
// 3ステップのスライド式フォーム
// ============================================================

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { saveProfile } from '@/lib/storage';
import type { Profile } from '@/types';

// ステップのアニメーション設定
const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);

    // フォーム値
    const [name, setName] = useState('');
    const [currentWeight, setCurrentWeight] = useState('');
    const [targetWeight, setTargetWeight] = useState('');
    const [calorieGoal, setCalorieGoal] = useState('');

    // エラー
    const [errors, setErrors] = useState<Record<string, string>>({});

    /** 推奨カロリーを計算 */
    const getRecommendedCalories = () => {
        const cw = parseFloat(currentWeight);
        if (!cw || cw <= 0) return null;
        // 1ヶ月で1kg減ペース ≒ 現在体重 × 25〜30 kcal
        const low = Math.round(cw * 25);
        const high = Math.round(cw * 30);
        return { low, high, recommended: Math.round((low + high) / 2) };
    };

    const goNext = () => {
        const newErrors: Record<string, string> = {};

        if (step === 1) {
            if (!name.trim()) newErrors.name = '名前を入力してください';
        } else if (step === 2) {
            const cw = parseFloat(currentWeight);
            const tw = parseFloat(targetWeight);
            if (!cw || cw <= 0) newErrors.currentWeight = '現在の体重を入力してください';
            if (!tw || tw <= 0) newErrors.targetWeight = '目標体重を入力してください';
            if (cw && tw && tw >= cw) newErrors.targetWeight = '目標体重は現在の体重より小さい値にしてください';
        } else if (step === 3) {
            const cal = parseInt(calorieGoal);
            if (!cal || cal <= 0) newErrors.calorieGoal = 'カロリー目標を入力してください';
            if (cal && cal < 800) newErrors.calorieGoal = '800kcal以上を設定してください';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        if (step < 3) {
            setDirection(1);
            setStep(step + 1);
            // Step 3 に進んだとき推奨カロリーを自動入力
            if (step === 2 && !calorieGoal) {
                const rec = getRecommendedCalories();
                if (rec) setCalorieGoal(String(rec.recommended));
            }
        }
    };

    const goBack = () => {
        setDirection(-1);
        setStep(step - 1);
    };

    const handleComplete = () => {
        const newErrors: Record<string, string> = {};
        const cal = parseInt(calorieGoal);
        if (!cal || cal <= 0) newErrors.calorieGoal = 'カロリー目標を入力してください';
        if (cal && cal < 800) newErrors.calorieGoal = '800kcal以上を設定してください';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // プロフィール保存
        const profile: Profile = {
            displayName: name.trim(),
            currentWeight: parseFloat(currentWeight),
            targetWeight: parseFloat(targetWeight),
            dailyCalorieGoal: cal,
            maintenanceMode: false,
            createdAt: new Date().toISOString(),
        };
        saveProfile(profile);
        router.push('/');
    };

    const rec = getRecommendedCalories();

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/5 to-background">
            {/* プログレスバー */}
            <div className="p-6 pt-12">
                <div className="flex gap-2 mb-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden bg-gray-200">
                            <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: s <= step ? '100%' : '0%' }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    ))}
                </div>
                <p className="text-sm text-text-secondary text-right">{step} / 3</p>
            </div>

            {/* ステップ内容 */}
            <div className="flex-1 px-6 relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="absolute inset-x-6"
                        >
                            <div className="text-center mb-8">
                                <motion.div
                                    className="text-6xl mb-4"
                                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                >
                                    👋
                                </motion.div>
                                <h1 className="text-2xl font-bold text-text-primary mb-2">はじめまして！</h1>
                                <p className="text-text-secondary">あなたの名前を教えてください</p>
                            </div>
                            <Input
                                placeholder="ニックネーム"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={errors.name}
                                autoFocus
                            />
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="absolute inset-x-6"
                        >
                            <div className="text-center mb-8">
                                <motion.div
                                    className="text-6xl mb-4"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                >
                                    ⚖️
                                </motion.div>
                                <h1 className="text-2xl font-bold text-text-primary mb-2">体重を教えてください</h1>
                                <p className="text-text-secondary">現在の体重と目標体重を入力しましょう</p>
                            </div>
                            <div className="space-y-4">
                                <Input
                                    label="現在の体重"
                                    type="number"
                                    step="0.1"
                                    placeholder="70.0"
                                    suffix="kg"
                                    value={currentWeight}
                                    onChange={(e) => setCurrentWeight(e.target.value)}
                                    error={errors.currentWeight}
                                />
                                <Input
                                    label="目標体重"
                                    type="number"
                                    step="0.1"
                                    placeholder="65.0"
                                    suffix="kg"
                                    value={targetWeight}
                                    onChange={(e) => setTargetWeight(e.target.value)}
                                    error={errors.targetWeight}
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="absolute inset-x-6"
                        >
                            <div className="text-center mb-8">
                                <motion.div
                                    className="text-6xl mb-4"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    🎯
                                </motion.div>
                                <h1 className="text-2xl font-bold text-text-primary mb-2">1日の目標カロリーは？</h1>
                                <p className="text-text-secondary">あとから変更できます</p>
                            </div>
                            <Input
                                label="1日の目標カロリー"
                                type="number"
                                placeholder="1800"
                                suffix="kcal"
                                value={calorieGoal}
                                onChange={(e) => setCalorieGoal(e.target.value)}
                                error={errors.calorieGoal}
                            />
                            {rec && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 bg-secondary/10 rounded-2xl"
                                >
                                    <p className="text-sm text-secondary font-medium">
                                        💡 おすすめ: {rec.low}〜{rec.high} kcal
                                    </p>
                                    <p className="text-xs text-text-secondary mt-1">
                                        1ヶ月で約1kg減のペースです
                                    </p>
                                    <button
                                        className="mt-2 text-sm font-semibold text-secondary hover:underline min-h-[44px]"
                                        onClick={() => setCalorieGoal(String(rec.recommended))}
                                    >
                                        おすすめを使う →
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ボタン */}
            <div className="p-6 flex gap-3">
                {step > 1 && (
                    <Button variant="ghost" onClick={goBack} className="flex-shrink-0">
                        ← 戻る
                    </Button>
                )}
                {step < 3 ? (
                    <Button fullWidth onClick={goNext}>
                        次へ →
                    </Button>
                ) : (
                    <Button fullWidth onClick={handleComplete}>
                        始めましょう！🔥
                    </Button>
                )}
            </div>
        </div>
    );
}
