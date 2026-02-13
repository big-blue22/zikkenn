// ============================================================
// localStorage ラッパー
// ★ 将来 Supabase に移行する際は、このファイルだけ差し替えればOK
// ============================================================

import {
    STORAGE_KEYS,
    type Profile,
    type Meal,
    type WeightLog,
    type Streak,
    type DailyStatus,
    type AppUsage,
    type BannerHistory,
} from '@/types';

// ----- インメモリフォールバック（プライベートブラウジング等） -----
const memoryStore: Record<string, string> = {};
let useMemory = false;

function isLocalStorageAvailable(): boolean {
    try {
        const testKey = '__diet_app_test__';
        localStorage.setItem(testKey, '1');
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
}

// 初期化チェック
if (typeof window !== 'undefined') {
    useMemory = !isLocalStorageAvailable();
}

// ----- 汎用ヘルパー -----

/** localStorage から値を読み込む（型安全） */
export function getStorageItem<T>(key: string, defaultValue: T): T {
    try {
        const raw = useMemory
            ? memoryStore[key]
            : localStorage.getItem(key);
        if (raw === null || raw === undefined) return defaultValue;
        return JSON.parse(raw) as T;
    } catch {
        return defaultValue;
    }
}

/** localStorage に値を保存 */
export function setStorageItem<T>(key: string, value: T): void {
    try {
        const json = JSON.stringify(value);
        if (useMemory) {
            memoryStore[key] = json;
        } else {
            localStorage.setItem(key, json);
        }
    } catch (e) {
        // 容量超過などのエラー
        console.warn('[storage] 保存に失敗しました:', e);
    }
}

/** localStorage の使用量を概算で取得（バイト数） */
export function getStorageUsage(): number {
    try {
        if (useMemory) {
            return Object.values(memoryStore).reduce((sum, v) => sum + v.length * 2, 0);
        }
        let total = 0;
        for (const key of Object.values(STORAGE_KEYS)) {
            const item = localStorage.getItem(key);
            if (item) total += (key.length + item.length) * 2; // UTF-16
        }
        return total;
    } catch {
        return 0;
    }
}

/** 容量が 4MB に近づいていないかチェック */
export function isStorageNearLimit(): boolean {
    return getStorageUsage() > 4 * 1024 * 1024;
}

// ----- データ種別ごとの型安全ラッパー -----

// --- Profile ---
export function getProfile(): Profile | null {
    return getStorageItem<Profile | null>(STORAGE_KEYS.PROFILE, null);
}
export function saveProfile(profile: Profile): void {
    setStorageItem(STORAGE_KEYS.PROFILE, profile);
}

// --- Meals ---
export function getMeals(): Meal[] {
    return getStorageItem<Meal[]>(STORAGE_KEYS.MEALS, []);
}
export function saveMeals(meals: Meal[]): void {
    setStorageItem(STORAGE_KEYS.MEALS, meals);
}

// --- Weight Logs ---
export function getWeightLogs(): WeightLog[] {
    return getStorageItem<WeightLog[]>(STORAGE_KEYS.WEIGHT_LOGS, []);
}
export function saveWeightLogs(logs: WeightLog[]): void {
    setStorageItem(STORAGE_KEYS.WEIGHT_LOGS, logs);
}

// --- Streak ---
const DEFAULT_STREAK: Streak = {
    currentStreak: 0,
    longestStreak: 0,
    lastStreakDate: null,
    cheatDayPasses: 2,
};
export function getStreak(): Streak {
    return getStorageItem<Streak>(STORAGE_KEYS.STREAK, DEFAULT_STREAK);
}
export function saveStreak(streak: Streak): void {
    setStorageItem(STORAGE_KEYS.STREAK, streak);
}

// --- Daily Status ---
export function getDailyStatuses(): DailyStatus[] {
    return getStorageItem<DailyStatus[]>(STORAGE_KEYS.DAILY_STATUS, []);
}
export function saveDailyStatuses(statuses: DailyStatus[]): void {
    setStorageItem(STORAGE_KEYS.DAILY_STATUS, statuses);
}

// --- App Usage ---
export function getAppUsages(): AppUsage[] {
    return getStorageItem<AppUsage[]>(STORAGE_KEYS.APP_USAGE, []);
}
export function saveAppUsages(usages: AppUsage[]): void {
    setStorageItem(STORAGE_KEYS.APP_USAGE, usages);
}

// --- Banner History ---
export function getBannerHistory(): BannerHistory[] {
    return getStorageItem<BannerHistory[]>(STORAGE_KEYS.BANNER_HISTORY, []);
}
export function saveBannerHistory(history: BannerHistory[]): void {
    setStorageItem(STORAGE_KEYS.BANNER_HISTORY, history);
}

// --- 全データエクスポート ---
export function exportAllData(): string {
    const data = {
        profile: getProfile(),
        meals: getMeals(),
        weightLogs: getWeightLogs(),
        streak: getStreak(),
        dailyStatuses: getDailyStatuses(),
        appUsages: getAppUsages(),
        exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
}

// --- 全データリセット ---
export function resetAllData(): void {
    for (const key of Object.values(STORAGE_KEYS)) {
        if (useMemory) {
            delete memoryStore[key];
        } else {
            localStorage.removeItem(key);
        }
    }
}
