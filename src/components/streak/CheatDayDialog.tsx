'use client';

// ============================================================
// CheatDayDialog — チートデイパス使用確認ダイアログ
// ============================================================

import Dialog from '@/components/ui/Dialog';
import Button from '@/components/ui/Button';
import type { StreakJudgement } from '@/lib/streak';

interface CheatDayDialogProps {
    open: boolean;
    judgement: StreakJudgement;
    onUsePass: () => void;
    onSkip: () => void;
}

export default function CheatDayDialog({
    open,
    judgement,
    onUsePass,
    onSkip,
}: CheatDayDialogProps) {
    return (
        <Dialog open={open} onClose={onSkip} title="ストリークを守りますか？">
            <div className="space-y-4">
                <div className="bg-warning/10 rounded-2xl p-4">
                    <p className="text-sm text-text-primary">
                        {judgement.hasRecords
                            ? `昨日のカロリーは ${judgement.totalCalories.toLocaleString()} kcal で、目標の120%（${Math.round(judgement.calorieGoal * 1.2).toLocaleString()} kcal）を超えました。`
                            : '昨日は食事の記録がありませんでした。'}
                    </p>
                </div>

                <div className="bg-primary/5 rounded-2xl p-4 text-center">
                    <p className="text-lg font-bold text-primary">🎫 チートデイパス</p>
                    <p className="text-sm text-text-secondary mt-1">
                        パスを使ってストリークを守りましょう！
                    </p>
                </div>

                <div className="space-y-2">
                    <Button fullWidth onClick={onUsePass}>
                        🎫 パスを使う
                    </Button>
                    <Button fullWidth variant="ghost" onClick={onSkip}>
                        使わない（ストリークリセット）
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
