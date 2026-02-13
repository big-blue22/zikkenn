// ============================================================
// 挫折予防スコア計算 (burnout.ts)
// ============================================================

import type { BurnoutLevel } from '@/types';
import { getMeals, getWeightLogs, getDailyStatuses } from '@/lib/storage';
import { getToday, formatDate } from '@/lib/calories';

/** 挫折スコア（0〜100）を計算 */
export function calculateBurnoutScore(): number {
    const today = getToday();
    const meals = getMeals();
    const weightLogs = getWeightLogs();
    const statuses = getDailyStatuses();

    let score = 0;

    // 1. 直近3日の食事記録数 vs 過去14日平均（重み30%）
    const recentDates = getDateRange(today, 3);
    const pastDates = getDateRange(today, 14);
    const recentMealCount = recentDates.reduce(
        (sum, d) => sum + meals.filter((m) => m.date === d).length,
        0,
    );
    const pastMealCount = pastDates.reduce(
        (sum, d) => sum + meals.filter((m) => m.date === d).length,
        0,
    );
    const avgPastMeals = pastDates.length > 0 ? pastMealCount / pastDates.length : 0;
    const avgRecentMeals = recentDates.length > 0 ? recentMealCount / recentDates.length : 0;
    if (avgPastMeals > 0 && avgRecentMeals / avgPastMeals <= 0.5) {
        score += 30;
    } else if (avgPastMeals > 0 && avgRecentMeals / avgPastMeals <= 0.7) {
        score += 15;
    }

    // 2. 体重の連続未記録日数（重み20%）
    let consecutiveNoWeight = 0;
    for (let i = 1; i <= 7; i++) {
        const d = new Date(today + 'T00:00:00');
        d.setDate(d.getDate() - i);
        const dateStr = formatDate(d);
        if (!weightLogs.some((w) => w.date === dateStr)) {
            consecutiveNoWeight++;
        } else {
            break;
        }
    }
    if (consecutiveNoWeight >= 3) score += 20;
    else if (consecutiveNoWeight >= 2) score += 10;

    // 3. カロリー目標の連続オーバー日数（重み25%）
    let consecutiveOver = 0;
    for (let i = 0; i < 5; i++) {
        const d = new Date(today + 'T00:00:00');
        d.setDate(d.getDate() - i - 1);
        const dateStr = formatDate(d);
        const status = statuses.find((s) => s.date === dateStr);
        if (status && (status.status === 'failed' || status.status === 'cheat_day_used')) {
            consecutiveOver++;
        } else {
            break;
        }
    }
    if (consecutiveOver >= 3) score += 25;
    else if (consecutiveOver >= 2) score += 12;

    // 4. 食事記録がある日数 / 直近7日（重み25%）
    const last7days = getDateRange(today, 7);
    const daysWithMeals = last7days.filter(
        (d) => meals.some((m) => m.date === d),
    ).length;
    const ratio = last7days.length > 0 ? daysWithMeals / last7days.length : 1;
    if (ratio <= 0.5) score += 25;
    else if (ratio <= 0.7) score += 12;

    return Math.min(score, 100);
}

/** スコアから介入レベルを判定 */
export function getBurnoutLevel(score: number): BurnoutLevel | null {
    if (score >= 80) return 4;
    if (score >= 60) return 3;
    if (score >= 40) return 2;
    if (score >= 20) return 1;
    return null;
}

/** 最終食事記録からの経過日数 */
export function getDaysSinceLastMeal(): number {
    const meals = getMeals();
    if (meals.length === 0) return 999;
    const sorted = [...meals].sort((a, b) => b.date.localeCompare(a.date));
    const lastDate = new Date(sorted[0].date + 'T00:00:00');
    const today = new Date(getToday() + 'T00:00:00');
    return Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
}

/** 日付範囲を生成（今日からn日前まで） */
function getDateRange(today: string, days: number): string[] {
    const result: string[] = [];
    for (let i = 1; i <= days; i++) {
        const d = new Date(today + 'T00:00:00');
        d.setDate(d.getDate() - i);
        result.push(formatDate(d));
    }
    return result;
}

/** レベルごとの介入メッセージ */
const MESSAGES: Record<number, string[]> = {
    1: [
        'いい感じ！記録を続けるだけで一歩リードです 💪',
        'コツコツ続いてますね。自分を褒めていい！',
        '今日も開いてくれてありがとう 😊',
        '記録するだけで意識が変わる。あなたは正しい道を歩んでます',
        'ちょっとした積み重ねが大きな変化に 🌱',
    ],
    2: [
        '最近ちょっと忙しい？目標を少し緩めてみない？',
        '無理しないでOK。ペースは自分で決められるよ',
        '調子がイマイチでも大丈夫。続けることが大事',
        'たまにはゆっくりいこう。マラソンと同じだよ 🏃',
        '完璧じゃなくていい。80点で十分！',
    ],
    3: [
        '完璧じゃなくていい。体重だけ測ってみない？',
        '休憩するのも立派な戦略。メンテナンスモードにする？',
        'ペースを変えてみましょう。ゆるく続けるのもアリ',
        '一旦リラックス。焦らず少しずつやっていこう 🍵',
        '今は無理しなくて大丈夫。気が向いたときでOK',
    ],
    4: [
        'おかえりなさい！今日は体重だけ記録してみない？たった10秒 ⏱️',
        '久しぶり！ゼロからじゃなく、ここから再スタートしよう',
        'また会えてうれしい！小さな一歩から始めよう 😊',
        'お帰り！まずは気軽に体重を記録してみよう',
        'あなたが戻ってきてくれただけで大きな一歩です ✨',
    ],
};

/** レベルに応じたランダムメッセージを返す */
export function getRandomMessage(level: BurnoutLevel): string {
    const msgs = MESSAGES[level];
    return msgs[Math.floor(Math.random() * msgs.length)];
}

/** レベルごとの色設定 */
export function getLevelColor(level: BurnoutLevel): string {
    switch (level) {
        case 1: return '#06D6A0'; // 緑
        case 2: return '#FFD166'; // 黄
        case 3: return '#FF6B35'; // オレンジ
        case 4: return '#E63946'; // 赤
    }
}
