// ============================================================
// ダイエットアプリ MVP — 全データ型定義
// ============================================================

/** 食品マスタの1件 */
export interface Food {
    name: string;
    nameKana: string; // ひらがな検索用
    calories: number;
    servingSize: string; // 例: '1杯(150g)'
}

/** ユーザープロフィール */
export interface Profile {
    displayName: string;
    currentWeight: number;
    targetWeight: number;
    dailyCalorieGoal: number;
    /** メンテナンスモード時の元の目標カロリー */
    originalCalorieGoal?: number;
    maintenanceMode: boolean;
    createdAt: string; // ISO 8601
}

/** 食事記録の1件 */
export interface Meal {
    id: string;
    date: string; // YYYY-MM-DD
    mealType: MealType;
    foodName: string;
    calories: number;
    photoDataUrl: string | null; // base64 Data URL
    createdAt: string; // ISO 8601
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

/** 体重記録の1件 */
export interface WeightLog {
    id: string;
    date: string; // YYYY-MM-DD
    weight: number;
    createdAt: string; // ISO 8601
}

/** ストリーク情報 */
export interface Streak {
    currentStreak: number;
    longestStreak: number;
    lastStreakDate: string | null; // YYYY-MM-DD
    cheatDayPasses: number; // 初期値 2、上限 3
}

/** 1日の達成状況 */
export type DailyStatusType =
    | 'cleared'
    | 'cleared_80'
    | 'cheat_day_used'
    | 'failed';

export interface DailyStatus {
    date: string; // YYYY-MM-DD
    totalCalories: number;
    calorieGoal: number;
    status: DailyStatusType;
    streakCountOnDate: number;
}

/** アプリ利用ログ（挫折予防スコア計算用） */
export interface AppUsage {
    date: string; // YYYY-MM-DD
    appOpens: number;
    mealsLogged: number;
    weightLogged: boolean;
}

/** バーンアウトバナーのレベル */
export type BurnoutLevel = 1 | 2 | 3 | 4;

/** バナー表示履歴（クールダウン制御用） */
export interface BannerHistory {
    level: BurnoutLevel;
    dismissedAt: string; // ISO 8601
}

/** localStorage のキー定数 */
export const STORAGE_KEYS = {
    PROFILE: 'diet_app_profile',
    MEALS: 'diet_app_meals',
    WEIGHT_LOGS: 'diet_app_weight_logs',
    STREAK: 'diet_app_streak',
    DAILY_STATUS: 'diet_app_daily_status',
    APP_USAGE: 'diet_app_app_usage',
    BANNER_HISTORY: 'diet_app_banner_history',
} as const;
