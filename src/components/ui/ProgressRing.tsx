'use client';

interface ProgressRingProps {
    /** 0〜1 の達成率 */
    progress: number;
    /** 中央に表示するテキスト（上段） */
    label: string;
    /** 中央に表示するテキスト（下段） */
    subLabel?: string;
    /** リングのサイズ (px) */
    size?: number;
    /** リングの太さ (px) */
    strokeWidth?: number;
}

/** 進捗に応じた色を返す（緑→黄→赤） */
function getProgressColor(progress: number): string {
    if (progress <= 0.7) return '#06D6A0'; // 成功色（緑）
    if (progress <= 0.9) return '#FFD166'; // 警告色（黄）
    return '#E63946'; // 危険色（赤）
}

export default function ProgressRing({
    progress,
    label,
    subLabel,
    size = 180,
    strokeWidth = 12,
}: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const clampedProgress = Math.min(Math.max(progress, 0), 1.5);
    const dashOffset = circumference * (1 - Math.min(clampedProgress, 1));
    const color = getProgressColor(clampedProgress);

    return (
        <div className="flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                {/* 背景リング */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth={strokeWidth}
                />
                {/* プログレスリング */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                />
            </svg>
            {/* 中央テキスト */}
            <div className="absolute flex flex-col items-center">
                <span className="text-sm font-medium text-text-secondary">{subLabel || '残り'}</span>
                <span className="text-2xl font-bold text-text-primary">{label}</span>
            </div>
        </div>
    );
}
