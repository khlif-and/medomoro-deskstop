import React, { useState, useEffect, useRef } from 'react';
import { Brain, Coffee, Battery } from 'lucide-react';
import { usePomodoroStore } from '../../store/usePomodoroStore';
import TimerDisplay from '../molecules/TimerDisplay';
import TimerControls from '../molecules/TimerControls';
import ModeSelector from '../molecules/ModeSelector';
import SessionIndicator from '../molecules/SessionIndicator';
import TimerSettings from './TimerSettings';
import alarmSound from '../../assets/alarm.mp3?url';

const MODES = {
    pomodoro: { id: 'pomodoro', label: 'Focus', color: 'text-rose-500', bg: 'bg-rose-50', ring: 'stroke-rose-500', icon: Brain },
    shortBreak: { id: 'shortBreak', label: 'Short Break', color: 'text-teal-500', bg: 'bg-teal-50', ring: 'stroke-teal-500', icon: Coffee },
    longBreak: { id: 'longBreak', label: 'Long Break', color: 'text-blue-500', bg: 'bg-blue-50', ring: 'stroke-blue-500', icon: Battery },
};

const PomodoroWidget = () => {
    // Global State from Zustand Store
    const store = usePomodoroStore();

    // Defensive checks for potential state corruption
    const mode = store.mode && MODES[store.mode] ? store.mode : 'pomodoro';
    const durations = store.durations || { pomodoro: 25, shortBreak: 5, longBreak: 15 };
    const {
        timeLeft, isActive, progress, sessionsCompleted,
        switchMode, toggleTimer, resetTimer, setDurations, tick, syncTime
    } = store;

    // Helper to get mode config safely
    const activeModeConfig = MODES[mode] || MODES.pomodoro;

    // Local UI State
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Audio Logic - Persistent Alarm
    const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
    const audioRef = useRef(new Audio(alarmSound));
    const prevSessionsRef = useRef(sessionsCompleted);

    // Configure audio loop
    useEffect(() => {
        audioRef.current.loop = true;
    }, []);

    // Sync time on mount (handle background throttling/tab switch)
    useEffect(() => {
        syncTime();

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                syncTime();
            }
        };

        const handleFocus = () => {
            syncTime();
        };

        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('focus', handleFocus);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [syncTime]);

    // Timer Interval - Handled by Web Worker in Store now.
    // useEffect for interval removed.

    // Watch for ANY timer completion (Focus or Break)
    const prevCompletionRef = useRef(store.completionTrigger);

    useEffect(() => {
        if (store.completionTrigger > prevCompletionRef.current) {
            startAlarm();
            prevCompletionRef.current = store.completionTrigger;
        }
    }, [store.completionTrigger]);

    const startAlarm = () => {
        if (isAlarmPlaying) return;

        try {
            audioRef.current.currentTime = 0;
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Audio playback failed:", error);
                });
            }

            setIsAlarmPlaying(true);
        } catch (e) {
            console.error("Alarm failed", e);
        }
    };

    const stopAlarm = () => {
        try {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        } catch (e) {
            console.error("Error stopping alarm", e);
        }
        setIsAlarmPlaying(false);
    };

    const handleSaveSettings = (newDurations) => {
        setDurations(newDurations);
        setIsSettingsOpen(false);
    };

    return (
        <div className="w-full h-full p-4 pt-28 flex flex-col items-center justify-center max-w-4xl mx-auto">

            {isAlarmPlaying && (
                <button
                    onClick={stopAlarm}
                    className="mb-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg animate-pulse transition-transform transform hover:scale-105 active:scale-95"
                >
                    STOP ALARM 🔔
                </button>
            )}

            <ModeSelector
                modes={MODES}
                currentMode={mode}
                onSwitch={(m) => switchMode(m, false)}
            />

            <TimerDisplay
                timeLeft={timeLeft}
                isActive={isActive}
                progress={progress}
                mode={mode}
                modeColor={activeModeConfig.color}
            />

            <TimerControls
                isActive={isActive}
                onToggle={toggleTimer}
                onReset={resetTimer}
                onSettings={() => setIsSettingsOpen(true)}
            />

            <SessionIndicator sessionsCompleted={sessionsCompleted} />

            <TimerSettings
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                durations={durations}
                onSave={handleSaveSettings}
            />
        </div>
    );
};

export default PomodoroWidget;
