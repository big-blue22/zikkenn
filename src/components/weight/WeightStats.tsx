'use client';

// ============================================================
// WeightStats — 体重統計カード
// ============================================================

import Card from '@/components/ui/Card';

interface WeightStatsProps {
    startWeight: number | null;
    currentWeight: number | null;
    targetWeight: number;
    dayDifference: number | null;
}

export default function WeightStats({
    startWeight,
    currentWeight,
    targetWeight,
    dayDifference,
}: WeightStatsProps) {
    const totalChange =
        startWeight && currentWeight ? +(currentWeight - startWeight).toFixed(1) : null;
    const remaining =
        currentWeight ? +(currentWeight - targetWeight).toFixed(1) : null;

    return (
        <div className="grid grid-cols-3 gap-2">
            {/* 前日比 */}
            <Card className="text-center">
                <p className="text-xs text-text-secondary mb-1">前日比</p>
                {dayDifference !== null ? (
                    <p
                        className={`text-lg font-bold ${dayDifference < 0
                                ? 'text-success'
                                : dayDifference > 0
                                    ? 'text-danger'
                                    : 'text-text-secondary'
                            }`}
                    >
                        {dayDifference > 0 ? '↑' : dayDifference < 0 ? '↓' : '±'}
                        {Math.abs(dayDifference)}kg
                    </p>
                ) : (
                    <p className="text-lg font-bold text-text-secondary">---</p>
                )}
            </Card>

            {/* 開始時からの増減 */}
            <Card className="text-center">
                <p className="text-xs text-text-secondary mb-1">開始から</p>
                {totalChange !== null ? (
                    <p
                        className={`text-lg font-bold ${totalChange < 0
                                ? 'text-success'
                                : totalChange > 0
                                    ? 'text-danger'
                                    : 'text-text-secondary'
                            }`}
                    >
                        {totalChange > 0 ? '+' : ''}{totalChange}kg
                    </p>
                ) : (
                    <p className="text-lg font-bold text-text-secondary">---</p>
                )}
            </Card>

            {/* 目標まで */}
            <Card className="text-center">
                <p className="text-xs text-text-secondary mb-1">目標まで</p>
                {remaining !== null ? (
                    <p className={`text-lg font-bold ${remaining <= 0 ? 'text-success' : 'text-primary'}`}>
                        {remaining <= 0 ? '達成！🎉' : `${remaining}kg`}
                    </p>
                ) : (
                    <p className="text-lg font-bold text-text-secondary">---</p>
                )}
            </Card>
        </div>
    );
}
