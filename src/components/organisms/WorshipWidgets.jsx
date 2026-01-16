import React, { useMemo } from 'react';
import { useMuslimStore } from '../../store/useMuslimStore';
import { Moon, Sun, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorshipWidgets = () => {
    const navigate = useNavigate();
    const { dailyRecords } = useMuslimStore();
    const todayStr = new Date().toLocaleDateString('en-CA');
    const record = dailyRecords[todayStr];

    // --- Prayer Logic ---
    const prayerStatus = useMemo(() => {
        const prayers = record?.prayers || {};
        const allPrayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

        // Find next or current prayer
        // Simple logic: find first non-filled prayer, or show "All Done"
        const nextPrayer = allPrayers.find(p => !prayers[p]?.time);

        if (!nextPrayer) return { label: "All Done", sub: "Alhamdulillah" };

        return {
            label: nextPrayer.charAt(0).toUpperCase() + nextPrayer.slice(1),
            sub: "Upcoming"
        };
    }, [record]);

    // --- Fasting Logic ---
    const fastingStatus = useMemo(() => {
        const isFasting = record?.habits?.fasting;
        const type = record?.habits?.fastingType;

        if (!isFasting) return { label: "Not Fasting", sub: "No active fast" };

        const labels = {
            'senin_kamis': 'Senin Kamis',
            'ayyamul_bidh': 'Ayyamul Bidh',
            'daud': 'Puasa Daud',
            'wajib': 'Qadha / Wajib',
            'other': 'Sunnah'
        };

        return {
            label: labels[type] || 'Fasting',
            sub: 'Keep it up!'
        };
    }, [record]);

    return (
        <div className="flex flex-col gap-4 mb-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Ibadah</h3>
                <button
                    onClick={() => navigate('/muslim')}
                    className="text-xs font-medium text-gray-400 hover:text-amber-500 flex items-center gap-1 transition-colors"
                >
                    Details <ChevronRight size={14} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {/* Prayer Card */}
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-3">
                        <Clock size={16} />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 font-medium mb-0.5">{prayerStatus.sub}</div>
                        <div className="text-sm font-bold text-gray-800">{prayerStatus.label}</div>
                    </div>
                </div>

                {/* Fasting Card */}
                <div className={`p-4 rounded-3xl border shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow
                    ${record?.habits?.fasting
                        ? 'bg-indigo-50 border-indigo-100'
                        : 'bg-white border-gray-100'
                    }`}
                >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3
                        ${record?.habits?.fasting ? 'bg-white text-indigo-500' : 'bg-gray-50 text-gray-400'}`}
                    >
                        {record?.habits?.fasting ? <Moon size={16} /> : <Sun size={16} />}
                    </div>
                    <div>
                        <div className={`text-xs font-medium mb-0.5 ${record?.habits?.fasting ? 'text-indigo-400' : 'text-gray-400'}`}>
                            {fastingStatus.sub}
                        </div>
                        <div className={`text-sm font-bold ${record?.habits?.fasting ? 'text-indigo-900' : 'text-gray-800'}`}>
                            {fastingStatus.label}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorshipWidgets;
