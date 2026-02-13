'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Meal, MealType } from '@/types';
import { getMeals, saveMeals } from '@/lib/storage';

/** 食事記録の読み書きフック */
export function useMeals() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setMeals(getMeals());
        setIsLoaded(true);
    }, []);

    /** 食事を追加 */
    const addMeal = useCallback(
        (meal: Omit<Meal, 'id' | 'createdAt'>) => {
            const newMeal: Meal = {
                ...meal,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
            };
            const updated = [...meals, newMeal];
            saveMeals(updated);
            setMeals(updated);
            return newMeal;
        },
        [meals],
    );

    /** 食事を削除 */
    const removeMeal = useCallback(
        (id: string) => {
            const updated = meals.filter((m) => m.id !== id);
            saveMeals(updated);
            setMeals(updated);
        },
        [meals],
    );

    /** 指定日の食事を取得 */
    const getMealsForDate = useCallback(
        (date: string) => meals.filter((m) => m.date === date),
        [meals],
    );

    /** 指定日・タイプの食事を取得 */
    const getMealsByDateAndType = useCallback(
        (date: string, type: MealType) =>
            meals.filter((m) => m.date === date && m.mealType === type),
        [meals],
    );

    return { meals, isLoaded, addMeal, removeMeal, getMealsForDate, getMealsByDateAndType };
}
