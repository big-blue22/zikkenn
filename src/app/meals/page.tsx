'use client';

// ============================================================
// 食事記録画面
// ============================================================

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import TabSwitcher from '@/components/ui/TabSwitcher';
import FoodSearch from '@/components/meals/FoodSearch';
import ManualEntry from '@/components/meals/ManualEntry';
import MealList from '@/components/meals/MealList';
import PhotoCapture from '@/components/meals/PhotoCapture';
import { useMeals } from '@/hooks/useMeals';
import { getToday, formatDateDisplay, formatDate } from '@/lib/calories';
import type { Food, MealType } from '@/types';

const mealTabs = [
    { key: 'breakfast', label: '朝食', icon: '🌅' },
    { key: 'lunch', label: '昼食', icon: '🌞' },
    { key: 'dinner', label: '夕食', icon: '🌆' },
    { key: 'snack', label: '間食', icon: '🍪' },
];

export default function MealsPage() {
    const { meals, addMeal, removeMeal, getMealsForDate } = useMeals();
    const [selectedDate, setSelectedDate] = useState(getToday());
    const [activeMealType, setActiveMealType] = useState<string>('breakfast');
    const [pendingPhoto, setPendingPhoto] = useState<string | null>(null);

    // 日付ナビゲーション
    const goDate = (offset: number) => {
        const d = new Date(selectedDate + 'T00:00:00');
        d.setDate(d.getDate() + offset);
        setSelectedDate(formatDate(d));
    };

    // 当日の食事（フィルタ済み）
    const dayMeals = useMemo(() => getMealsForDate(selectedDate), [getMealsForDate, selectedDate]);
    const filteredMeals = useMemo(
        () => dayMeals.filter((m) => m.mealType === activeMealType),
        [dayMeals, activeMealType],
    );

    // 当日のカロリー合計
    const totalCalories = useMemo(
        () => dayMeals.reduce((sum, m) => sum + m.calories, 0),
        [dayMeals],
    );

    // 食品マスタから追加
    const handleFoodSelect = (food: Food) => {
        addMeal({
            date: selectedDate,
            mealType: activeMealType as MealType,
            foodName: food.name,
            calories: food.calories,
            photoDataUrl: pendingPhoto,
        });
        setPendingPhoto(null);
    };

    // 手動入力から追加
    const handleManualAdd = (foodName: string, calories: number) => {
        addMeal({
            date: selectedDate,
            mealType: activeMealType as MealType,
            foodName,
            calories,
            photoDataUrl: pendingPhoto,
        });
        setPendingPhoto(null);
    };

    const isToday = selectedDate === getToday();

    return (
        <div className="page-content">
            {/* 日付セレクター */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => goDate(-1)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                    ◀
                </button>
                <div className="text-center">
                    <p className="font-bold text-lg text-text-primary">
                        {isToday ? '今日' : formatDateDisplay(selectedDate)}
                    </p>
                    {isToday && (
                        <p className="text-xs text-text-secondary">{formatDateDisplay(selectedDate)}</p>
                    )}
                </div>
                <button
                    onClick={() => goDate(1)}
                    disabled={isToday}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center disabled:opacity-30"
                >
                    ▶
                </button>
            </div>

            {/* 食事タイプ切替 */}
            <div className="mb-4">
                <TabSwitcher
                    tabs={mealTabs}
                    activeKey={activeMealType}
                    onTabChange={setActiveMealType}
                />
            </div>

            {/* 検索 */}
            <div className="mb-3">
                <FoodSearch onSelect={handleFoodSelect} />
            </div>

            {/* 手動入力 */}
            <div className="mb-3">
                <ManualEntry onAdd={handleManualAdd} />
            </div>

            {/* 写真撮影 */}
            <div className="mb-4 flex items-center gap-3">
                <PhotoCapture onCapture={setPendingPhoto} />
                {pendingPhoto && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                    >
                        <img src={pendingPhoto} alt="撮影した写真" className="w-10 h-10 rounded-xl object-cover" />
                        <button
                            onClick={() => setPendingPhoto(null)}
                            className="text-xs text-danger hover:underline min-h-[44px]"
                        >
                            取消
                        </button>
                    </motion.div>
                )}
            </div>

            {/* 記録済みリスト */}
            <div className="mb-20">
                <h3 className="font-semibold text-sm text-text-secondary mb-2">
                    {mealTabs.find((t) => t.key === activeMealType)?.icon}{' '}
                    {mealTabs.find((t) => t.key === activeMealType)?.label}の記録
                </h3>
                <MealList meals={filteredMeals} onRemove={removeMeal} />
            </div>

            {/* 合計カロリー（sticky） */}
            <motion.div
                className="fixed bottom-[72px] left-0 right-0 z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div className="max-w-[480px] mx-auto px-4 pb-2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-text-secondary">今日の合計</span>
                        <span className="text-lg font-bold text-primary">
                            {totalCalories.toLocaleString()} kcal
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
