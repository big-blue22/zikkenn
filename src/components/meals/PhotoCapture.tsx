'use client';

// ============================================================
// PhotoCapture — 写真撮影/ギャラリー選択 + リサイズ
// ============================================================

import { useRef } from 'react';

interface PhotoCaptureProps {
    onCapture: (dataUrl: string) => void;
}

/** 画像を最大幅 800px、最大 200KB にリサイズ */
async function resizeImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                let { width, height } = img;

                if (width > MAX_WIDTH) {
                    height = (height * MAX_WIDTH) / width;
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d')!;
                ctx.drawImage(img, 0, 0, width, height);

                // 品質を下げながら 200KB 以下になるまで圧縮
                let quality = 0.8;
                let dataUrl = canvas.toDataURL('image/jpeg', quality);
                while (dataUrl.length > 200 * 1024 && quality > 0.1) {
                    quality -= 0.1;
                    dataUrl = canvas.toDataURL('image/jpeg', quality);
                }

                resolve(dataUrl);
            };
            img.onerror = reject;
            img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default function PhotoCapture({ onCapture }: PhotoCaptureProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const dataUrl = await resizeImage(file);
            onCapture(dataUrl);
        } catch (err) {
            console.error('画像の読み込みに失敗:', err);
        }

        // リセット（同じファイルを再選択可能に）
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-50
          hover:bg-gray-100 transition-colors text-sm font-medium text-text-secondary
          min-h-[44px]"
            >
                📷 写真を撮る / 選ぶ
            </button>
        </>
    );
}
