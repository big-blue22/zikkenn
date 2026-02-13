'use client';

import { useState, useCallback, useEffect } from 'react';
import type { WeightLog } from '@/types';
import { getWeightLogs, saveWeightLogs } from '@/lib/storage';

/** 体重記録の読み書きフック */
export function useWeight() {
    const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setWeightLogs(getWeightLogs());
        setIsLoaded(true);
    }, []);

    /** 体重を記録（同日なら上書き） */
    const addWeight = useCallback(
        (date: string, weight: number) => {
            const existing = weightLogs.filter((w) => w.date !== date);
            const newLog: WeightLog = {
                id: crypto.randomUUID(),
                date,
                weight,
                createdAt: new Date().toISOString(),
            };
            const updated = [...existing, newLog].sort((a, b) => a.date.localeCompare(b.date));
            saveWeightLogs(updated);
            setWeightLogs(updated);
            return newLog;
        },
        [weightLogs],
    );

    /** 指定日の体重を取得 */
    const getWeightForDate = useCallback(
        (date: string) => weightLogs.find((w) => w.date === date),
        [weightLogs],
    );

    /** 最新の体重を取得 */
    const getLatestWeight = useCallback(() => {
        if (weightLogs.length === 0) return null;
        return weightLogs[weightLogs.length - 1];
    }, [weightLogs]);

    /** 前日比を計算 */
    const getDayDifference = useCallback(
        (date: string) => {
            const todayLog = weightLogs.find((w) => w.date === date);
            if (!todayLog) return null;
            const idx = weightLogs.indexOf(todayLog);
            if (idx <= 0) return null;
            return +(todayLog.weight - weightLogs[idx - 1].weight).toFixed(1);
        },
        [weightLogs],
    );

    return { weightLogs, isLoaded, addWeight, getWeightForDate, getLatestWeight, getDayDifference };
}
