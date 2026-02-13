'use client';

// ============================================================
// StreakBanner — ホーム画面最上部のストリーク表示
// ============================================================

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import FireAnimation from '@/components/streak/FireAnimation';
import type { Streak } from '@/types';

interface StreakBannerProps {
    streak: Streak;
}

export default function StreakBanner({ streak }: StreakBannerProps) {
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
        >
            <Card className="bg-gradient-to-r from-primary/5 to-warning/5 border-2 border-primary/10">
                <div className="flex items-center gap-4">
                    <FireAnimation streakCount={streak.currentStreak} size="md" />
                    <div className="flex-1">
                        <p className="text-lg font-bold text-text-primary">
                            {streak.currentStreak > 0
                                ? `${streak.currentStreak}日連続ヘルシー！`
                                : 'ストリークを始めよう！'}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-text-secondary">
                                🏆 自己ベスト: {streak.longestStreak}日
                            </span>
                            <span className="text-xs text-text-secondary">
                                🎫 パス残り: {streak.cheatDayPasses}枚
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
