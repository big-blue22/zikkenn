'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Profile } from '@/types';
import { getProfile, saveProfile } from '@/lib/storage';

/** プロフィールの読み書きフック */
export function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setProfile(getProfile());
        setIsLoaded(true);
    }, []);

    const updateProfile = useCallback((newProfile: Profile) => {
        saveProfile(newProfile);
        setProfile(newProfile);
    }, []);

    const patchProfile = useCallback(
        (patch: Partial<Profile>) => {
            if (!profile) return;
            const updated = { ...profile, ...patch };
            saveProfile(updated);
            setProfile(updated);
        },
        [profile],
    );

    return { profile, isLoaded, updateProfile, patchProfile };
}
