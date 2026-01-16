import React, { useMemo, useEffect } from 'react';
import { useMuslimStore } from '../../store/useMuslimStore';
import { Clock, CheckCircle2, AlertTriangle, Quote } from 'lucide-react';

const PrayerReportCard = ({ dailyRecord, date }) => {
    const { getRandomMessage, setDailyMessage } = useMuslimStore();

    // 1. Determine current overall status
    const currentStatus = useMemo(() => {
        const prayers = Object.entries(dailyRecord?.prayers || {});

        if (prayers.some(([_, data]) => data.status === 'missed')) return 'missed';
        if (prayers.some(([_, data]) => data.status === 'late')) return 'late';
        if (prayers.some(([_, data]) => data.status === 'ontime')) return 'ontime';

        return null; // No status yet (all empty or null)
    }, [dailyRecord]);

    // 2. Sync Message: If stored message type doesn't match current status, generate new one
    useEffect(() => {
        if (!currentStatus) return;

        const storedMsg = dailyRecord?.dailyMessage;

        if (storedMsg?.type !== currentStatus) {
            // Status changed (or first run), generate new persistent message
            const newMsg = getRandomMessage(currentStatus);
            if (newMsg) {
                setDailyMessage(date, currentStatus, newMsg);
            }
        }
    }, [currentStatus, dailyRecord?.dailyMessage, date, getRandomMessage, setDailyMessage]);

    // 3. Render based on Current Status settings + Stored Message Content
    if (!currentStatus) {
        // Render a placeholder or empty state if no prayers are done yet
        // For Dashboard, maybe show a generic "Start your day with Bismillah" if empty?
        // Or just return null to hide it.
        // Let's return a default motivating card if null to fill the space
        return (
            <div className="w-full p-6 rounded-[32px] border bg-gray-50 border-gray-100 mb-6 flex items-center gap-4">
                <div className="p-3 bg-white rounded-full text-gray-400">
                    <CheckCircle2 size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-700">Daily Tracker</h3>
                    <p className="font-medium text-sm text-gray-500">Belum ada data sholat hari ini. Yuk mulai!</p>
                </div>
            </div>
        );
    }

    // Configuration for UI colors/icons
    const config = {
        missed: {
            title: 'Evaluasi Harian',
            color: 'bg-red-50 border-red-200 text-red-800',
            icon: AlertTriangle
        },
        late: {
            title: 'Pengingat Diri',
            color: 'bg-amber-50 border-amber-200 text-amber-800',
            icon: Clock
        },
        ontime: {
            title: 'Syukur Harian',
            color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
            icon: CheckCircle2
        }
    };

    const ui = config[currentStatus];
    const messageContent = dailyRecord?.dailyMessage?.content || "..."; // Fallback while saving

    return (
        <div className={`w-full p-6 rounded-[32px] border ${ui.color} mb-6 transition-all animate-in slide-in-from-top-4 shadow-sm`}>
            <div className="flex items-start gap-4">
                <div className="p-3 bg-white/50 rounded-full">
                    <ui.icon size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-1">{ui.title}</h3>
                    <div className="flex items-start gap-2 opacity-90">
                        <Quote size={16} className="mt-1 shrink-0 transform scale-x-[-1]" />
                        <p className="font-medium italic text-sm leading-relaxed">
                            "{messageContent}"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrayerReportCard;
