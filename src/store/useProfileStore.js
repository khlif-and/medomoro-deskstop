import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useProfileStore = create(
    persist(
        (set) => ({
            name: 'Lora Piterson',
            role: 'UX/UI Designer',
            price: '$1,200',
            profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
            themeColor: '#fef3c7', // amber-100 hex roughly as default

            setProfile: (data) => set((state) => ({ ...state, ...data })),
        }),
        {
            name: 'profile-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
