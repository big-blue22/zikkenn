'use client';

// ============================================================
// WeightChart — Recharts 折れ線グラフ
// ============================================================

import { useMemo } from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceLine,
    CartesianGrid,
} from 'recharts';
import type { WeightLog } from '@/types';

interface WeightChartProps {
    weightLogs: WeightLog[];
    targetWeight: number;
    period: '7d' | '30d' | 'all';
}

export default function WeightChart({ weightLogs, targetWeight, period }: WeightChartProps) {
    const data = useMemo(() => {
        let logs = [...weightLogs].sort((a, b) => a.date.localeCompare(b.date));

        if (period !== 'all') {
            const days = period === '7d' ? 7 : 30;
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - days);
            const cutoffStr = cutoff.toISOString().slice(0, 10);
            logs = logs.filter((l) => l.date >= cutoffStr);
        }

        return logs.map((l) => ({
            date: `${parseInt(l.date.slice(5, 7))}/${parseInt(l.date.slice(8, 10))}`,
            weight: l.weight,
            fullDate: l.date,
        }));
    }, [weightLogs, period]);

    if (data.length === 0) {
        return (
            <div className="bg-card rounded-3xl shadow-sm p-6 text-center">
                <p className="text-3xl mb-2">📊</p>
                <p className="text-sm text-text-secondary">データが追加されるとグラフが表示されます</p>
            </div>
        );
    }

    // Y軸の範囲を計算
    const weights = data.map((d) => d.weight);
    const minW = Math.min(...weights, targetWeight);
    const maxW = Math.max(...weights, targetWeight);
    const yMin = Math.floor(minW - 2);
    const yMax = Math.ceil(maxW + 2);

    return (
        <div className="bg-card rounded-3xl shadow-sm p-4">
            <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: '#6B7280' }}
                        tickLine={false}
                        axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <YAxis
                        domain={[yMin, yMax]}
                        tick={{ fontSize: 11, fill: '#6B7280' }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v: number) => `${v}kg`}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            fontSize: '13px',
                        }}
                        formatter={(value: number | string | undefined) => [`${value} kg`, '体重']}
                    />
                    {/* 目標体重ライン */}
                    <ReferenceLine
                        y={targetWeight}
                        stroke="#2EC4B6"
                        strokeDasharray="8 4"
                        strokeWidth={2}
                        label={{
                            value: `目標 ${targetWeight}kg`,
                            position: 'right',
                            fill: '#2EC4B6',
                            fontSize: 11,
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#FF6B35"
                        strokeWidth={3}
                        dot={{ fill: '#FF6B35', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#FF6B35' }}
                        connectNulls
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
