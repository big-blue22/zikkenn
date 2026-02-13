'use client';

// ============================================================
// BurnoutBanner — 挫折予防のスライドインバナー
// ============================================================

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import type { BurnoutLevel } from '@/types';
import { getLevelColor } from '@/lib/burnout';

interface BurnoutBannerProps {
    level: BurnoutLevel;
    message: string;
    visible: boolean;
    onDismiss: () => void;
    onAdjustGoal?: () => void;
    onMaintenanceMode?: () => void;
}

export default function BurnoutBanner({
    level,
    message,
    visible,
    onDismiss,
    onAdjustGoal,
    onMaintenanceMode,
}: BurnoutBannerProps) {
    const router = useRouter();
    const color = getLevelColor(level);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    className="rounded-2xl p-4 shadow-md relative mb-4"
                    style={{ backgroundColor: `${color}15`, borderLeft: `4px solid ${color}` }}
                >
                    {/* 閉じるボタン */}
                    <button
                        onClick={onDismiss}
                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center
              rounded-full hover:bg-black/5 text-text-secondary min-h-[44px] min-w-[44px]"
                    >
                        ✕
                    </button>

                    <p className="text-sm font-medium text-text-primary pr-8 mb-3">
                        {message}
                    </p>

                    {/* Level 2: 目標調整ボタン */}
                    {level === 2 && onAdjustGoal && (
                        <Button size="sm" variant="outline" onClick={onAdjustGoal}>
                            目標を調整する
                        </Button>
                    )}

                    {/* Level 3: メンテナンスモード */}
                    {level === 3 && onMaintenanceMode && (
                        <Button size="sm" variant="outline" onClick={onMaintenanceMode}>
                            メンテナンスモードにする
                        </Button>
                    )}

                    {/* Level 4: 体重記録へ */}
                    {level === 4 && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                                onDismiss();
                                router.push('/weight');
                            }}
                        >
                            体重だけ記録する ⚖️
                        </Button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
