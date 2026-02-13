'use client';

// ============================================================
// AppShell — BottomNav + プロフィール未設定時リダイレクト
// ============================================================

import { useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import BottomNav from '@/components/ui/BottomNav';
import { getProfile } from '@/lib/storage';

interface AppShellProps {
    children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [ready, setReady] = useState(false);

    const isOnboarding = pathname === '/onboarding';

    useEffect(() => {
        // プロフィール未設定ならオンボーディングへ
        const profile = getProfile();
        if (!profile && !isOnboarding) {
            router.replace('/onboarding');
            return;
        }
        setReady(true);
    }, [pathname, isOnboarding, router]);

    // ローディング中
    if (!ready) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-4xl animate-pulse-gentle">🔥</div>
            </div>
        );
    }

    // オンボーディング中はナビなし
    if (isOnboarding) {
        return <>{children}</>;
    }

    return (
        <>
            {children}
            <BottomNav />
        </>
    );
}
