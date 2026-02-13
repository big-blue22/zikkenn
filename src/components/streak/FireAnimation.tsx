'use client';

// ============================================================
// FireAnimation — ストリーク段階別の炎アニメーション
// ============================================================

import { motion } from 'framer-motion';
import { getStreakLevel } from '@/lib/streak';

interface FireAnimationProps {
    streakCount: number;
    size?: 'sm' | 'md' | 'lg';
}

export default function FireAnimation({ streakCount, size = 'md' }: FireAnimationProps) {
    const level = getStreakLevel(streakCount);

    const sizeMap = { sm: 'text-3xl', md: 'text-5xl', lg: 'text-7xl' };

    if (level === 'none') {
        // 灰色の炎（静止）
        return (
            <span className={`${sizeMap[size]} opacity-40 grayscale inline-block`}>
                🔥
            </span>
        );
    }

    if (level === 'low') {
        // オレンジの小さい炎（ゆっくり揺れる）
        return (
            <motion.span
                className={`${sizeMap[size]} inline-block`}
                animate={{
                    rotate: [-3, 3, -3],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                🔥
            </motion.span>
        );
    }

    if (level === 'mid') {
        // 中くらいの炎（活発に揺れる + 微パーティクル）
        return (
            <div className="relative inline-block">
                <motion.span
                    className={`${sizeMap[size]} inline-block`}
                    animate={{
                        rotate: [-5, 5, -3, 5, -5],
                        scale: [1, 1.1, 1.05, 1.12, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    🔥
                </motion.span>
                {/* パーティクル */}
                {[...Array(3)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute text-xs pointer-events-none"
                        style={{
                            left: `${40 + Math.random() * 20}%`,
                            bottom: '80%',
                        }}
                        animate={{
                            y: [-10, -30 - Math.random() * 20],
                            opacity: [0.8, 0],
                            scale: [1, 0.5],
                        }}
                        transition={{
                            duration: 1 + Math.random() * 0.5,
                            repeat: Infinity,
                            delay: i * 0.4,
                        }}
                    >
                        ✨
                    </motion.span>
                ))}
            </div>
        );
    }

    // high: 大きい炎（激しく揺れる + パーティクル多数）
    return (
        <div className="relative inline-block">
            <motion.span
                className={`${sizeMap[size]} inline-block`}
                animate={{
                    rotate: [-8, 8, -5, 8, -8],
                    scale: [1, 1.15, 1.05, 1.2, 1],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                🔥
            </motion.span>
            {/* 多数パーティクル */}
            {[...Array(6)].map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute text-sm pointer-events-none"
                    style={{
                        left: `${20 + Math.random() * 60}%`,
                        bottom: '70%',
                    }}
                    animate={{
                        y: [-5, -40 - Math.random() * 30],
                        x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30],
                        opacity: [1, 0],
                        scale: [1, 0.3],
                    }}
                    transition={{
                        duration: 0.8 + Math.random() * 0.5,
                        repeat: Infinity,
                        delay: i * 0.25,
                    }}
                >
                    {['✨', '🌟', '⭐'][i % 3]}
                </motion.span>
            ))}
        </div>
    );
}
