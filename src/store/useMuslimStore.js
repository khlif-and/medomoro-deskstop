import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useMuslimStore = create(
    persist(
        (set, get) => ({
            // Global State for Quran Progress
            lastRead: {
                surah: '',
                ayat: '',
                juz: ''
            },

            // Messages Config
            messages: {
                ontime: [
                    "Alhamdulillah, pertahankan terus tepat waktunya! 🌟",
                    "Allah sangat mencintai hamba yang sholat di awal waktu. ❤️",
                    "Surga merindukan orang-orang yang menjaga sholatnya. 🕌",
                    "Ketenangan hati dimulai dari sujud tepat waktu.",
                    "Mantap! Teruslah menjadi inspirasi."
                ],
                late: [
                    "Lebih baik terlambat daripada tidak, tapi yuk besok lebih awal! ⏰",
                    "Allah menunggumu dari tadi lho, jangan biasakan telat ya. 🥺",
                    "Sholat itu tiang agama, jangan biarkan tiangnya miring karena telat.",
                    "Kesibukan dunia gak ada habisnya, utamakan panggilan-Nya.",
                    "Sayang banget pahalanya berkurang, yuk perbaiki!"
                ],
                missed: [
                    "Kamu lewat ibadah, kapan Allah mau bantu kamu? 😔",
                    "Dunia dikejar, akhirat ditinggal. Situ sehat? 🤨",
                    "Nanti kalau susah jangan tanya kenapa Allah terasa jauh ya.",
                    "Sombong amat sama Pencipta sendiri. Inget mati bro.",
                    "Rugi bandar! Rezeki seret baru tau rasa nanti."
                ]
            },

            // Daily records keyed by YYYY-MM-DD
            dailyRecords: {},

            // Actions
            getRandomMessage: (status) => {
                const msgs = get().messages[status];
                if (!msgs) return "";
                return msgs[Math.floor(Math.random() * msgs.length)];
            },

            updateLastRead: (data) => set((state) => ({
                lastRead: { ...state.lastRead, ...data }
            })),

            // Base update for generic data
            updateDailyRecord: (date, data) => set((state) => {
                const currentRecord = state.dailyRecords[date] || get().getEmptyRecord();
                return {
                    dailyRecords: {
                        ...state.dailyRecords,
                        [date]: { ...currentRecord, ...data }
                    }
                };
            }),

            // Updates a prayer manually
            updatePrayer: (date, prayerName, time, status) => set((state) => {
                const currentRecord = state.dailyRecords[date] || get().getEmptyRecord();
                return {
                    dailyRecords: {
                        ...state.dailyRecords,
                        [date]: {
                            ...currentRecord,
                            prayers: {
                                ...currentRecord.prayers,
                                [prayerName]: { time, status }
                            }
                        }
                    }
                };
            }),

            // AUTOMATION: Marks prayer as done RIGHT NOW
            markPrayerAsDone: (date, prayerName) => set((state) => {
                const now = new Date();
                const timeString = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

                const currentRecord = state.dailyRecords[date] || get().getEmptyRecord();

                // Logic: If marking done, default status to 'ontime' unless changed later
                return {
                    dailyRecords: {
                        ...state.dailyRecords,
                        [date]: {
                            ...currentRecord,
                            prayers: {
                                ...currentRecord.prayers,
                                [prayerName]: { time: timeString, status: 'ontime' }
                            }
                        }
                    }
                };
            }),

            // Update Habit (Boolean)
            toggleHabit: (date, habitName) => set((state) => {
                const currentRecord = state.dailyRecords[date] || get().getEmptyRecord();
                return {
                    dailyRecords: {
                        ...state.dailyRecords,
                        [date]: {
                            ...currentRecord,
                            habits: {
                                ...currentRecord.habits,
                                [habitName]: !currentRecord.habits[habitName]
                            }
                        }
                    }
                };
            }),

            // Message Persistence
            setDailyMessage: (date, type, content) => set((state) => {
                const currentRecord = state.dailyRecords[date] || get().getEmptyRecord();

                // Only update if actually different to avoid redundant saves
                if (currentRecord.dailyMessage?.type === type && currentRecord.dailyMessage?.content === content) {
                    return {};
                }

                return {
                    dailyRecords: {
                        ...state.dailyRecords,
                        [date]: {
                            ...currentRecord,
                            dailyMessage: { type, content }
                        }
                    }
                };
            }),

            // SHAUM LOGIC: Set Fasting Type
            setFastingType: (date, type) => set((state) => {
                const currentRecord = state.dailyRecords[date] || get().getEmptyRecord();
                // If setting a type, imply fasting is true
                const isFasting = !!type;

                return {
                    dailyRecords: {
                        ...state.dailyRecords,
                        [date]: {
                            ...currentRecord,
                            habits: {
                                ...currentRecord.habits,
                                fasting: isFasting,
                                fastingType: type
                            }
                        }
                    }
                };
            }),

            // Helper to generate empty record structure
            getEmptyRecord: () => ({
                prayers: {
                    fajr: { time: '', status: null },
                    dhuhr: { time: '', status: null },
                    asr: { time: '', status: null },
                    maghrib: { time: '', status: null },
                    isha: { time: '', status: null }
                },
                habits: {
                    fasting: false,
                    fastingType: '', // 'sunnah_senin_kamis', 'ayyamul_bidh', 'ramadan', etc
                    sahur: false,
                    goodDeed: false,
                    quranRead: false
                },
                dailyMessage: { type: null, content: null }
            })
        }),
        {
            name: 'muslim-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
