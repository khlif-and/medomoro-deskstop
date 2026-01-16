import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useProfileStore = create(
    persist(
        (set) => ({
            name: '',
            role: '',

            profileImage: '',
            themeColor: '#fef3c7', // amber-100 hex roughly as default

            setProfile: (data) => set((state) => ({ ...state, ...data })),
        }),
        {
            name: 'profile-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
