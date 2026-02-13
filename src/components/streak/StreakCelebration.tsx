'use client';

// ============================================================
// StreakCelebration — 達成時のお祝いアニメーション
// ============================================================

import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import type { CelebrationEvent } from '@/lib/streak';

interface StreakCelebrationProps {
    celebration: CelebrationEvent | null;
    onDismiss: () => void;
}

export default function StreakCelebration({ celebration, onDismiss }: StreakCelebrationProps) {
    return (
        <AnimatePresence>
            {celebration && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onDismiss}
                    />
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center relative overflow-hidden"
                            initial={{ scale: 0.5, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.5, y: 50 }}
                            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                        >
                            {/* 背景パーティクル */}
                            {[...Array(12)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    className="absolute text-2xl pointer-events-none"
                                    style={{
                                        left: `${10 + Math.random() * 80}%`,
                                        top: `${10 + Math.random() * 80}%`,
                                    }}
                                    animate={{
                                        y: [0, -100 - Math.random() * 100],
                                        x: [(Math.random() - 0.5) * 50],
                                        opacity: [1, 0],
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 1.5 + Math.random(),
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                    }}
                                >
                                    {['🎉', '🌟', '✨', '🎊', '💪', '⭐'][i % 6]}
                                </motion.span>
                            ))}

                            <motion.div
                                className="text-6xl mb-4"
                                animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                            >
                                {celebration.type === 'week' && '🎉'}
                                {celebration.type === 'month' && '🏆'}
                                {celebration.type === 'personal_best' && '⭐'}
                            </motion.div>

                            <h2 className="text-xl font-bold text-text-primary mb-2">
                                おめでとう！
                            </h2>
                            <p className="text-base text-text-secondary mb-6">
                                {celebration.message}
                            </p>

                            <Button fullWidth onClick={onDismiss}>
                                ありがとう！ 😊
                            </Button>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
