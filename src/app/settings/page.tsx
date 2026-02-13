'use client';

// ============================================================
// 設定画面
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Dialog from '@/components/ui/Dialog';
import { useProfile } from '@/hooks/useProfile';
import { exportAllData, resetAllData, getStreak, isStorageNearLimit } from '@/lib/storage';

export default function SettingsPage() {
    const { profile, patchProfile } = useProfile();
    const [editName, setEditName] = useState('');
    const [editTarget, setEditTarget] = useState('');
    const [editCalorie, setEditCalorie] = useState('');
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showResetDialog, setShowResetDialog] = useState(false);
    const [showExportedMsg, setShowExportedMsg] = useState(false);

    const streak = getStreak();
    const nearLimit = isStorageNearLimit();

    if (!profile) return null;

    const openEdit = () => {
        setEditName(profile.displayName);
        setEditTarget(String(profile.targetWeight));
        setEditCalorie(String(profile.dailyCalorieGoal));
        setShowEditDialog(true);
    };

    const saveEdit = () => {
        const tw = parseFloat(editTarget);
        const cal = parseInt(editCalorie);
        if (!editName.trim() || !tw || !cal) return;
        patchProfile({
            displayName: editName.trim(),
            targetWeight: tw,
            dailyCalorieGoal: cal,
        });
        setShowEditDialog(false);
    };

    const toggleMaintenance = () => {
        if (profile.maintenanceMode) {
            // 減量モードに戻す
            patchProfile({
                maintenanceMode: false,
                dailyCalorieGoal: profile.originalCalorieGoal || profile.dailyCalorieGoal,
                originalCalorieGoal: undefined,
            });
        } else {
            // メンテナンスモードに
            patchProfile({
                maintenanceMode: true,
                originalCalorieGoal: profile.dailyCalorieGoal,
                dailyCalorieGoal: profile.dailyCalorieGoal + 300,
            });
        }
    };

    const handleExport = () => {
        const data = exportAllData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `diet_app_backup_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        setShowExportedMsg(true);
        setTimeout(() => setShowExportedMsg(false), 3000);
    };

    const handleReset = () => {
        resetAllData();
        setShowResetDialog(false);
        window.location.href = '/onboarding';
    };

    return (
        <div className="page-content">
            <h1 className="text-xl font-bold text-text-primary mb-4">設定 ⚙️</h1>

            {/* 容量警告 */}
            {nearLimit && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-danger/10 border-l-4 border-danger rounded-2xl p-4 mb-4"
                >
                    <p className="text-sm text-danger font-medium">
                        ⚠️ ストレージの容量が上限に近づいています。古い写真を削除するか、データをエクスポートしてください。
                    </p>
                </motion.div>
            )}

            {/* プロフィール */}
            <Card className="mb-3">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-semibold text-text-primary">プロフィール</h2>
                    <Button size="sm" variant="ghost" onClick={openEdit}>
                        編集
                    </Button>
                </div>
                <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                        <span className="text-text-secondary">名前</span>
                        <span className="font-medium">{profile.displayName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-text-secondary">目標体重</span>
                        <span className="font-medium">{profile.targetWeight} kg</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-text-secondary">目標カロリー</span>
                        <span className="font-medium">{profile.dailyCalorieGoal} kcal</span>
                    </div>
                </div>
            </Card>

            {/* メンテナンスモード */}
            <Card className="mb-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-text-primary">メンテナンスモード</h2>
                        <p className="text-xs text-text-secondary mt-0.5">
                            {profile.maintenanceMode
                                ? `現在 ON（目標 +300kcal = ${profile.dailyCalorieGoal}kcal）`
                                : '目標カロリーを一時的に緩和します'}
                        </p>
                    </div>
                    <button
                        onClick={toggleMaintenance}
                        className={`relative w-14 h-8 rounded-full transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center ${profile.maintenanceMode ? 'bg-secondary' : 'bg-gray-300'
                            }`}
                    >
                        <motion.div
                            className="w-6 h-6 bg-white rounded-full shadow-md"
                            animate={{ x: profile.maintenanceMode ? 28 : 4 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                    </button>
                </div>
            </Card>

            {/* ストリーク統計 */}
            <Card className="mb-3">
                <h2 className="font-semibold text-text-primary mb-2">ストリーク統計</h2>
                <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                        <span className="text-text-secondary">🔥 現在のストリーク</span>
                        <span className="font-bold text-primary">{streak.currentStreak}日</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-text-secondary">🏆 過去最高</span>
                        <span className="font-bold">{streak.longestStreak}日</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-text-secondary">🎫 チートデイパス</span>
                        <span className="font-bold">{streak.cheatDayPasses}枚</span>
                    </div>
                </div>
            </Card>

            {/* データ管理 */}
            <Card className="mb-3">
                <h2 className="font-semibold text-text-primary mb-3">データ管理</h2>
                <div className="space-y-2">
                    <Button fullWidth variant="outline" onClick={handleExport}>
                        📦 データをエクスポート
                    </Button>
                    {showExportedMsg && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-success text-center"
                        >
                            ✅ ダウンロードしました
                        </motion.p>
                    )}
                    <Button fullWidth variant="danger" onClick={() => setShowResetDialog(true)}>
                        🗑️ データをすべてリセット
                    </Button>
                </div>
            </Card>

            {/* プロフィール編集ダイアログ */}
            <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)} title="プロフィール編集">
                <div className="space-y-3">
                    <Input
                        label="名前"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                    <Input
                        label="目標体重"
                        type="number"
                        step="0.1"
                        suffix="kg"
                        value={editTarget}
                        onChange={(e) => setEditTarget(e.target.value)}
                    />
                    <Input
                        label="目標カロリー"
                        type="number"
                        suffix="kcal"
                        value={editCalorie}
                        onChange={(e) => setEditCalorie(e.target.value)}
                    />
                    <div className="flex gap-2 pt-2">
                        <Button fullWidth variant="ghost" onClick={() => setShowEditDialog(false)}>
                            キャンセル
                        </Button>
                        <Button fullWidth onClick={saveEdit}>
                            保存
                        </Button>
                    </div>
                </div>
            </Dialog>

            {/* リセット確認ダイアログ */}
            <Dialog open={showResetDialog} onClose={() => setShowResetDialog(false)} title="データをリセットしますか？">
                <div className="space-y-4">
                    <p className="text-sm text-text-secondary">
                        すべてのデータが削除されます。この操作は取り消せません。
                    </p>
                    <p className="text-sm text-danger font-medium">
                        💡 先にデータをエクスポートすることをおすすめします
                    </p>
                    <div className="flex gap-2">
                        <Button fullWidth variant="ghost" onClick={() => setShowResetDialog(false)}>
                            キャンセル
                        </Button>
                        <Button fullWidth variant="danger" onClick={handleReset}>
                            リセットする
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
