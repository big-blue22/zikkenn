'use client';

// ============================================================
// 体重記録画面
// ============================================================

import { useMemo, useState } from 'react';
import TabSwitcher from '@/components/ui/TabSwitcher';
import WeightInput from '@/components/weight/WeightInput';
import WeightChart from '@/components/weight/WeightChart';
import WeightStats from '@/components/weight/WeightStats';
import { useWeight } from '@/hooks/useWeight';
import { useProfile } from '@/hooks/useProfile';
import { getToday } from '@/lib/calories';

const periodTabs = [
    { key: '7d', label: '7日' },
    { key: '30d', label: '30日' },
    { key: 'all', label: '全期間' },
];

export default function WeightPage() {
    const { weightLogs, addWeight, getWeightForDate, getDayDifference } = useWeight();
    const { profile } = useProfile();
    const [period, setPeriod] = useState<string>('7d');

    const today = getToday();
    const todayLog = useMemo(() => getWeightForDate(today), [getWeightForDate, today]);
    const dayDiff = useMemo(() => getDayDifference(today), [getDayDifference, today]);

    const startWeight = weightLogs.length > 0 ? weightLogs[0].weight : null;
    const currentWeight = todayLog?.weight ?? (weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : null);

    if (!profile) return null;

    return (
        <div className="page-content">
            <h1 className="text-xl font-bold text-text-primary mb-4">体重記録 ⚖️</h1>

            {/* 体重入力 */}
            <div className="mb-4">
                <WeightInput
                    currentValue={todayLog?.weight}
                    onSubmit={(w) => addWeight(today, w)}
                />
            </div>

            {/* 統計カード */}
            <div className="mb-4">
                <WeightStats
                    startWeight={startWeight}
                    currentWeight={currentWeight}
                    targetWeight={profile.targetWeight}
                    dayDifference={dayDiff}
                />
            </div>

            {/* 期間切替 */}
            <div className="mb-3">
                <TabSwitcher
                    tabs={periodTabs}
                    activeKey={period}
                    onTabChange={setPeriod}
                />
            </div>

            {/* グラフ */}
            <WeightChart
                weightLogs={weightLogs}
                targetWeight={profile.targetWeight}
                period={period as '7d' | '30d' | 'all'}
            />
        </div>
    );
}
