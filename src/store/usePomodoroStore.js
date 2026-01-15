import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const usePomodoroStore = create(
    persist(
        (set, get) => ({
            // Configuration State
            durations: {
                pomodoro: 25,
                shortBreak: 5,
                longBreak: 15
            },
            mode: 'pomodoro',

            // Timer State
            timeLeft: 25 * 60,
            isActive: false,
            progress: 100,
            sessionsCompleted: 0,
            streak: 0,
            lastStreakDate: null,
            totalActivityTime: 0, // in minutes
            totalShortBreakTime: 0,
            totalLongBreakTime: 0,
            dailyHistory: {}, // { '2024-01-15': 50, ... }
            lastTick: 0,

            // Actions
            setDurations: (newDurations) => {
                const { mode } = get();
                // Update durations and reset timer to new duration of current mode
                set({
                    durations: newDurations,
                    timeLeft: newDurations[mode] * 60,
                    isActive: false,
                    progress: 100
                });
            },

            switchMode: (newMode, autoStart = false) => {
                const { durations } = get();
                // Safety check for duration
                const duration = durations[newMode] || 25;
                set({
                    mode: newMode,
                    timeLeft: duration * 60,
                    isActive: autoStart,
                    progress: 100
                });
            },

            toggleTimer: () => {
                const { isActive } = get();
                set({
                    isActive: !isActive,
                    lastTick: !isActive ? Date.now() : 0
                });
            },

            resetTimer: () => {
                const { durations, mode } = get();
                const duration = durations[mode] || 25;
                set({
                    isActive: false,
                    timeLeft: duration * 60,
                    progress: 100,
                    lastTick: 0
                });
            },

            incrementSession: () => set((state) => ({ sessionsCompleted: (state.sessionsCompleted || 0) + 1 })),

            incrementStreak: () => set((state) => {
                const today = new Date().toISOString().split('T')[0];
                const lastDate = state.lastStreakDate;

                if (lastDate === today) {
                    return {};
                }

                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                if (lastDate === yesterdayStr) {
                    return { streak: (state.streak || 0) + 1, lastStreakDate: today };
                }

                return { streak: 1, lastStreakDate: today };
            }),

            addActivityTime: (minutes) => set((state) => {
                const today = new Date().toISOString().split('T')[0];
                const newHistory = { ...state.dailyHistory };
                newHistory[today] = (newHistory[today] || 0) + minutes;

                return {
                    totalActivityTime: (state.totalActivityTime || 0) + minutes,
                    dailyHistory: newHistory
                };
            }),

            addShortBreakTime: (minutes) => set((state) => ({ totalShortBreakTime: (state.totalShortBreakTime || 0) + minutes })),
            addLongBreakTime: (minutes) => set((state) => ({ totalLongBreakTime: (state.totalLongBreakTime || 0) + minutes })),

            // Core Tick Logic - Call this from a global interval
            tick: () => {
                const { timeLeft, isActive, durations, mode } = get();

                if (!isActive) return;

                if (timeLeft > 0) {
                    const newTime = timeLeft - 1;
                    const duration = durations[mode] || 25;
                    const totalTime = duration * 60;
                    set({
                        timeLeft: newTime,
                        progress: totalTime > 0 ? (newTime / totalTime) * 100 : 0,
                        lastTick: Date.now()
                    });
                } else {
                    // Timer Finished
                    const { mode, sessionsCompleted, switchMode, incrementSession, incrementStreak, addActivityTime, addShortBreakTime, addLongBreakTime } = get();

                    if (mode === 'pomodoro') {
                        incrementSession();
                        incrementStreak();
                        addActivityTime(durations.pomodoro || 25);
                        // Auto switch logic
                        switchMode('shortBreak', true);
                    } else if (mode === 'shortBreak') {
                        addShortBreakTime(durations.shortBreak || 5);
                        if (sessionsCompleted > 0 && sessionsCompleted % 3 === 0) {
                            switchMode('longBreak', true);
                        } else {
                            switchMode('pomodoro', true);
                        }
                    } else if (mode === 'longBreak') {
                        addLongBreakTime(durations.longBreak || 15);
                        switchMode('pomodoro', true);
                    } else {
                        // Fallback
                        set({ isActive: false });
                    }
                }
            },

            // Correction logic for when app returns to foreground
            syncTime: () => {
                const { isActive, lastTick, timeLeft } = get();
                if (isActive && lastTick > 0) {
                    const now = Date.now();
                    const elapsed = Math.floor((now - lastTick) / 1000);
                    if (elapsed > 0) {
                        const newTime = Math.max(0, timeLeft - elapsed);
                        set({
                            timeLeft: newTime,
                            lastTick: now
                        });
                    }
                }
            }

        }),
        {
            name: 'pomodoro-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                durations: state.durations,
                mode: state.mode,
                timeLeft: state.timeLeft,
                isActive: state.isActive,
                sessionsCompleted: state.sessionsCompleted,
                streak: state.streak,
                lastStreakDate: state.lastStreakDate,
                totalActivityTime: state.totalActivityTime,
                totalShortBreakTime: state.totalShortBreakTime,
                totalLongBreakTime: state.totalLongBreakTime,
                dailyHistory: state.dailyHistory,
                lastTick: state.lastTick
            }),
            // Migration/Versioning to clear old bad state if needed
            version: 1,
            migrate: (persistedState, version) => {
                if (version === 0) {
                    // if old version, just reset
                    return {
                        durations: { pomodoro: 25, shortBreak: 5, longBreak: 15 },
                        mode: 'pomodoro',
                        timeLeft: 1500,
                        isActive: false,
                        sessionsCompleted: 0,
                        streak: 0,
                        lastStreakDate: null,
                        totalActivityTime: 0,
                        totalShortBreakTime: 0,
                        totalLongBreakTime: 0,
                        dailyHistory: {}
                    };
                }
                return persistedState;
            },
        }
    )
);
