// ============================================================
// ストリーク判定ロジック
// 80%ルール + チートデイパス
// ============================================================

import type { Meal, Streak, DailyStatus, DailyStatusType } from '@/types';
import {
    getStreak,
    saveStreak,
    getDailyStatuses,
    saveDailyStatuses,
    getMeals,
} from '@/lib/storage';
import { getProfile } from '@/lib/storage';
import { getYesterday, getTotalCaloriesForDate } from '@/lib/calories';

/** 前日のストリーク判定結果 */
export interface StreakJudgement {
    needsJudgement: boolean;
    date: string;
    totalCalories: number;
    calorieGoal: number;
    isWithinLimit: boolean;
    hasRecords: boolean;
    /** チートデイパスが使えるか */
    canUseCheatDay: boolean;
}

/** 前日がまだ判定されていないかチェック */
export function checkYesterdayJudgement(): StreakJudgement | null {
    const profile = getProfile();
    if (!profile) return null;

    const yesterday = getYesterday();
    const streak = getStreak();
    const statuses = getDailyStatuses();

    // 既に判定済みならスキップ
    if (statuses.some((s) => s.date === yesterday)) return null;

    // lastStreakDate が未来または当日なら判定不要
    if (streak.lastStreakDate && streak.lastStreakDate >= yesterday) return null;

    const meals = getMeals();
    const totalCalories = getTotalCaloriesForDate(meals, yesterday);
    const goal = profile.dailyCalorieGoal;
    const limit = goal * 1.2; // 120%ルール
    const hasRecords = meals.filter((m) => m.date === yesterday).length > 0;
    const isWithinLimit = hasRecords && totalCalories <= limit;

    return {
        needsJudgement: true,
        date: yesterday,
        totalCalories,
        calorieGoal: goal,
        isWithinLimit,
        hasRecords,
        canUseCheatDay: streak.cheatDayPasses > 0,
    };
}

/** ストリーク判定を確定する */
export function applyStreakJudgement(
    date: string,
    useCheatDay: boolean,
): { streak: Streak; status: DailyStatus; celebration: CelebrationEvent | null } {
    const profile = getProfile();
    const streak = getStreak();
    const statuses = getDailyStatuses();
    const meals = getMeals();
    const totalCalories = getTotalCaloriesForDate(meals, date);
    const goal = profile?.dailyCalorieGoal || 1800;
    const limit = goal * 1.2;
    const hasRecords = meals.filter((m) => m.date === date).length > 0;
    const isWithinLimit = hasRecords && totalCalories <= limit;

    let statusType: DailyStatusType;

    if (isWithinLimit) {
        statusType = totalCalories <= goal ? 'cleared' : 'cleared_80';
    } else if (useCheatDay && streak.cheatDayPasses > 0) {
        statusType = 'cheat_day_used';
    } else {
        statusType = 'failed';
    }

    // ストリーク更新
    const prevStreak = streak.currentStreak;
    if (statusType === 'cleared' || statusType === 'cleared_80' || statusType === 'cheat_day_used') {
        streak.currentStreak += 1;
        if (streak.currentStreak > streak.longestStreak) {
            streak.longestStreak = streak.currentStreak;
        }
        if (statusType === 'cheat_day_used') {
            streak.cheatDayPasses -= 1;
        }
    } else {
        streak.currentStreak = 0;
    }

    // 7日連続でパス追加（上限3枚）
    if (streak.currentStreak > 0 && streak.currentStreak % 7 === 0 && streak.cheatDayPasses < 3) {
        streak.cheatDayPasses += 1;
    }

    streak.lastStreakDate = date;
    saveStreak(streak);

    // DailyStatus 保存
    const dailyStatus: DailyStatus = {
        date,
        totalCalories,
        calorieGoal: goal,
        status: statusType,
        streakCountOnDate: streak.currentStreak,
    };
    const updatedStatuses = [...statuses.filter((s) => s.date !== date), dailyStatus];
    saveDailyStatuses(updatedStatuses);

    // お祝いイベント判定
    let celebration: CelebrationEvent | null = null;
    if (statusType !== 'failed') {
        if (streak.currentStreak === 7) {
            celebration = { type: 'week', message: '🎉 1週間達成！チートデイパスを獲得！' };
        } else if (streak.currentStreak === 30) {
            celebration = { type: 'month', message: '🏆 30日連続！伝説の始まり！' };
        } else if (streak.currentStreak > prevStreak && streak.currentStreak === streak.longestStreak && streak.currentStreak > 1) {
            celebration = { type: 'personal_best', message: '⭐ 自己ベスト更新！' };
        }
    }

    return { streak, status: dailyStatus, celebration };
}

/** お祝いイベントの型 */
export interface CelebrationEvent {
    type: 'week' | 'month' | 'personal_best';
    message: string;
}

/** ストリーク段階 */
export function getStreakLevel(streak: number): 'none' | 'low' | 'mid' | 'high' {
    if (streak <= 0) return 'none';
    if (streak < 7) return 'low';
    if (streak < 30) return 'mid';
    return 'high';
}
