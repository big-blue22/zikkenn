'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Streak } from '@/types';
import { getStreak } from '@/lib/storage';
import {
    checkYesterdayJudgement,
    applyStreakJudgement,
    type StreakJudgement,
    type CelebrationEvent,
} from '@/lib/streak';

/** ストリーク管理フック */
export function useStreak() {
    const [streak, setStreak] = useState<Streak>(getStreak());
    const [judgement, setJudgement] = useState<StreakJudgement | null>(null);
    const [celebration, setCelebration] = useState<CelebrationEvent | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setStreak(getStreak());
        const j = checkYesterdayJudgement();
        setJudgement(j);
        setIsLoaded(true);
    }, []);

    /** ストリーク判定を適用 */
    const applyJudgement = useCallback(
        (useCheatDay: boolean) => {
            if (!judgement) return;
            const result = applyStreakJudgement(judgement.date, useCheatDay);
            setStreak(result.streak);
            setCelebration(result.celebration);
            setJudgement(null);
        },
        [judgement],
    );

    /** 判定不要（範囲内）の場合に自動適用 */
    const autoApply = useCallback(() => {
        if (!judgement) return;
        if (judgement.isWithinLimit) {
            const result = applyStreakJudgement(judgement.date, false);
            setStreak(result.streak);
            setCelebration(result.celebration);
            setJudgement(null);
        }
    }, [judgement]);

    /** お祝いを閉じる */
    const dismissCelebration = useCallback(() => setCelebration(null), []);

    return {
        streak,
        judgement,
        celebration,
        isLoaded,
        applyJudgement,
        autoApply,
        dismissCelebration,
    };
}
