// ============================================================
// カロリー計算ヘルパー
// ============================================================

import type { Meal, MealType } from '@/types';

/** 指定日のカロリー合計を返す */
export function getTotalCaloriesForDate(meals: Meal[], date: string): number {
    return meals
        .filter((m) => m.date === date)
        .reduce((sum, m) => sum + m.calories, 0);
}

/** 指定日・食事タイプごとのカロリー合計を返す */
export function getCaloriesByMealType(
    meals: Meal[],
    date: string,
): Record<MealType, number> {
    const result: Record<MealType, number> = {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snack: 0,
    };
    meals
        .filter((m) => m.date === date)
        .forEach((m) => {
            result[m.mealType] += m.calories;
        });
    return result;
}

/** 指定日の食事をタイプ別に取得 */
export function getMealsByType(
    meals: Meal[],
    date: string,
    mealType: MealType,
): Meal[] {
    return meals.filter((m) => m.date === date && m.mealType === mealType);
}

/** 今日の日付を YYYY-MM-DD で返す */
export function getToday(): string {
    const d = new Date();
    return formatDate(d);
}

/** 前日の日付を YYYY-MM-DD で返す */
export function getYesterday(): string {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return formatDate(d);
}

/** Date → YYYY-MM-DD */
export function formatDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

/** YYYY-MM-DD → 表示用文字列 (例: 2月13日(木)) */
export function formatDateDisplay(dateStr: string): string {
    const d = new Date(dateStr + 'T00:00:00');
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    return `${d.getMonth() + 1}月${d.getDate()}日(${dayNames[d.getDay()]})`;
}

/** 目標カロリーに対するカロリー残量を計算 */
export function getRemainingCalories(
    totalCalories: number,
    goalCalories: number,
): number {
    return Math.max(0, goalCalories - totalCalories);
}

/** 目標カロリーに対する達成率を 0〜1 で返す */
export function getCalorieProgress(
    totalCalories: number,
    goalCalories: number,
): number {
    if (goalCalories <= 0) return 0;
    return Math.min(totalCalories / goalCalories, 1.5); // 150%上限
}
