'use client';

// ============================================================
// ホーム画面（完全版）
// ストリーク + バーンアウトバナー + カロリーサマリー + 食事カード
// ============================================================

import { useMemo, useEffect, useState } from 'react';
import CalorieSummary from '@/components/home/CalorieSummary';
import MealCards from '@/components/home/MealCards';
import StreakBanner from '@/components/home/StreakBanner';
import BurnoutBanner from '@/components/home/BurnoutBanner';
import CheatDayDialog from '@/components/streak/CheatDayDialog';
import StreakCelebration from '@/components/streak/StreakCelebration';
import Dialog from '@/components/ui/Dialog';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useProfile } from '@/hooks/useProfile';
import { useMeals } from '@/hooks/useMeals';
import { useStreak } from '@/hooks/useStreak';
import { useBurnout } from '@/hooks/useBurnout';
import { getToday, getCaloriesByMealType, getTotalCaloriesForDate } from '@/lib/calories';

export default function HomePage() {
  const { profile, isLoaded: profileLoaded, patchProfile } = useProfile();
  const { meals, isLoaded: mealsLoaded } = useMeals();
  const {
    streak,
    judgement,
    celebration,
    isLoaded: streakLoaded,
    applyJudgement,
    autoApply,
    dismissCelebration,
  } = useStreak();
  const burnout = useBurnout();

  // 目標調整ダイアログ
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [newGoal, setNewGoal] = useState('');

  const today = getToday();

  const totalCalories = useMemo(
    () => getTotalCaloriesForDate(meals, today),
    [meals, today],
  );

  const caloriesByType = useMemo(
    () => getCaloriesByMealType(meals, today),
    [meals, today],
  );

  const mealData = [
    { type: 'breakfast' as const, icon: '🌅', label: '朝食', calories: caloriesByType.breakfast },
    { type: 'lunch' as const, icon: '🌞', label: '昼食', calories: caloriesByType.lunch },
    { type: 'dinner' as const, icon: '🌆', label: '夕食', calories: caloriesByType.dinner },
    { type: 'snack' as const, icon: '🍪', label: '間食', calories: caloriesByType.snack },
  ];

  // ストリーク自動切り替え（範囲内なら自動適用）
  useEffect(() => {
    if (streakLoaded && judgement?.isWithinLimit) {
      autoApply();
    }
  }, [streakLoaded, judgement, autoApply]);

  // チートデイダイアログの表示判定
  const showCheatDayDialog =
    streakLoaded && judgement && !judgement.isWithinLimit;

  // 目標調整の保存
  const handleGoalSave = () => {
    const cal = parseInt(newGoal);
    if (cal && cal >= 800 && profile) {
      patchProfile({ dailyCalorieGoal: cal });
      setShowGoalDialog(false);
      burnout.dismiss();
    }
  };

  // メンテナンスモード
  const handleMaintenanceMode = () => {
    if (profile) {
      patchProfile({
        maintenanceMode: true,
        originalCalorieGoal: profile.dailyCalorieGoal,
        dailyCalorieGoal: profile.dailyCalorieGoal + 300,
      });
      burnout.dismiss();
    }
  };

  if (!profileLoaded || !mealsLoaded || !streakLoaded) {
    return (
      <div className="page-content flex items-center justify-center min-h-[60vh]">
        <div className="text-4xl animate-pulse-gentle">🔥</div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="page-content">
      {/* 挨拶 */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-text-primary">
          こんにちは、{profile.displayName}さん 👋
        </h1>
        <p className="text-sm text-text-secondary mt-0.5">
          今日も一緒にがんばろう！
        </p>
      </div>

      {/* 挫折予防バナー */}
      {burnout.visible && burnout.level && (
        <BurnoutBanner
          level={burnout.level}
          message={burnout.message}
          visible={burnout.visible}
          onDismiss={burnout.dismiss}
          onAdjustGoal={() => {
            setNewGoal(String(profile.dailyCalorieGoal));
            setShowGoalDialog(true);
          }}
          onMaintenanceMode={handleMaintenanceMode}
        />
      )}

      {/* ストリークバナー */}
      <div className="mb-4">
        <StreakBanner streak={streak} />
      </div>

      {/* カロリーサマリー */}
      <div className="mb-4">
        <CalorieSummary
          totalCalories={totalCalories}
          goalCalories={profile.dailyCalorieGoal}
        />
      </div>

      {/* 食事カード */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-text-secondary mb-2">
          今日の食事
        </h2>
        <MealCards mealData={mealData} />
      </div>

      {/* チートデイダイアログ */}
      {showCheatDayDialog && judgement && (
        <CheatDayDialog
          open={true}
          judgement={judgement}
          onUsePass={() => applyJudgement(true)}
          onSkip={() => applyJudgement(false)}
        />
      )}

      {/* お祝いアニメーション */}
      <StreakCelebration celebration={celebration} onDismiss={dismissCelebration} />

      {/* 目標調整ダイアログ */}
      <Dialog open={showGoalDialog} onClose={() => setShowGoalDialog(false)} title="目標カロリーを調整">
        <div className="space-y-3">
          <p className="text-sm text-text-secondary">
            無理のないペースで続けましょう 😊
          </p>
          <Input
            label="新しい目標カロリー"
            type="number"
            suffix="kcal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
          <div className="flex gap-2">
            <Button fullWidth variant="ghost" onClick={() => setShowGoalDialog(false)}>
              キャンセル
            </Button>
            <Button fullWidth onClick={handleGoalSave}>
              保存
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
