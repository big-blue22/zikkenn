'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BurnoutLevel } from '@/types';
import { getBannerHistory, saveBannerHistory } from '@/lib/storage';
import {
    calculateBurnoutScore,
    getBurnoutLevel,
    getRandomMessage,
    getDaysSinceLastMeal,
} from '@/lib/burnout';

/** 挫折予防バナーの管理フック */
export function useBurnout() {
    const [level, setLevel] = useState<BurnoutLevel | null>(null);
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // 最終食事記録から5日空いたら強制 Level 4
        const daysSince = getDaysSinceLastMeal();
        let burnoutLevel: BurnoutLevel | null;
        if (daysSince >= 5) {
            burnoutLevel = 4;
        } else {
            const score = calculateBurnoutScore();
            burnoutLevel = getBurnoutLevel(score);
        }

        if (!burnoutLevel) return;

        // クールダウンチェック（同じレベルは48時間表示しない）
        const history = getBannerHistory();
        const lastBanner = history.find((h) => h.level === burnoutLevel);
        if (lastBanner) {
            const elapsed = Date.now() - new Date(lastBanner.dismissedAt).getTime();
            if (elapsed < 48 * 60 * 60 * 1000) return; // 48時間以内
        }

        setLevel(burnoutLevel);
        setMessage(getRandomMessage(burnoutLevel));
        setVisible(true);
    }, []);

    const dismiss = useCallback(() => {
        if (level) {
            const history = getBannerHistory().filter((h) => h.level !== level);
            history.push({ level, dismissedAt: new Date().toISOString() });
            saveBannerHistory(history);
        }
        setVisible(false);
    }, [level]);

    return { level, message, visible, dismiss };
}
