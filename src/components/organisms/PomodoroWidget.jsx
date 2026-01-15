import React, { useState, useEffect, useRef } from 'react';
import { Brain, Coffee, Battery } from 'lucide-react';
import { usePomodoroStore } from '../../store/usePomodoroStore';
import TimerDisplay from '../molecules/TimerDisplay';
import TimerControls from '../molecules/TimerControls';
import ModeSelector from '../molecules/ModeSelector';
import SessionIndicator from '../molecules/SessionIndicator';
import TimerSettings from './TimerSettings';

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

    // Sync time on mount (handle background throttling/tab switch)
    useEffect(() => {
        syncTime();
    }, []);

    // Timer Interval - Driver for the global tick
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                tick();
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, tick]);

    // Audio Logic - Triggered by Session Completion
    const prevSessionsRef = useRef(sessionsCompleted);
    useEffect(() => {
        if (sessionsCompleted > prevSessionsRef.current) {
            playNotification();
            prevSessionsRef.current = sessionsCompleted;
        }
        // Also update ref if it resets (though sessions usually only go up)
        if (sessionsCompleted < prevSessionsRef.current) {
            prevSessionsRef.current = sessionsCompleted;
        }
    }, [sessionsCompleted]);

    // Audio Context for Beep
    const playNotification = () => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.error("Audio play failed", e);
        }
    };

    const handleSaveSettings = (newDurations) => {
        setDurations(newDurations);
        setIsSettingsOpen(false);
    };

    return (
        <div className="w-full h-full p-4 pt-28 flex flex-col items-center justify-center max-w-4xl mx-auto">

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
