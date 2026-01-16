import React, { useMemo } from 'react';
import { useMuslimStore } from '../../store/useMuslimStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Moon, Sun, Clock, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorshipSummary = () => {
    const navigate = useNavigate();
    const { dailyRecords } = useMuslimStore();
    const todayStr = new Date().toLocaleDateString('en-CA');
    const record = dailyRecords[todayStr];

    // --- Prayer Data for Chart ---
    const prayerData = useMemo(() => {
        const prayers = record?.prayers || {};
        const list = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

        let completed = 0;
        let missed = 0;
        let remaining = 0;

        list.forEach(p => {
            const pData = prayers[p];
            if (pData?.time) {
                if (pData.status === 'missed') missed++;
                else completed++;
            } else {
                remaining++;
            }
        });

        // Data for Recharts
        return [
            { name: 'Completed', value: completed, color: '#10b981' }, // Emerald-500
            { name: 'Missed', value: missed, color: '#ef4444' },    // Red-500
            { name: 'Remaining', value: remaining, color: '#e2e8f0' } // Slate-200
        ];
    }, [record]);

    const totalCompleted = prayerData[0].value;
    const totalMissed = prayerData[1].value;
    const score = totalCompleted + totalMissed > 0
        ? Math.round((totalCompleted / 5) * 100)
        : 0;

    // --- Fasting Logic ---
    const fastingInfo = useMemo(() => {
        const isFasting = record?.habits?.fasting;
        const type = record?.habits?.fastingType;

        if (isFasting) {
            const labels = {
                'senin_kamis': 'Senin Kamis',
                'ayyamul_bidh': 'Ayyamul Bidh',
                'daud': 'Puasa Daud',
                'wajib': 'Qadha / Wajib',
                'other': 'Sunnah'
            };
            return { label: labels[type] || 'Sedang Puasa', icon: Moon, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' };
        }
        return { label: 'Tidak Puasa', icon: Sun, color: 'text-gray-400', bg: 'bg-gray-50 border-gray-100' };
    }, [record]);


    return (
        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-center justify-between min-h-[200px]">
            {/* Left: Chart Section */}
            <div className="flex items-center gap-6 flex-1">
                <div className="relative w-32 h-32 flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={prayerData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={55}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={10}
                            >
                                {prayerData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold text-gray-800">{score}%</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Done</span>
                    </div>
                </div>

                {/* Legend / Stats */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-sm font-medium text-gray-600">Completed ({prayerData[0].value})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm font-medium text-gray-600">Missed ({prayerData[1].value})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                        <span className="text-sm font-medium text-gray-400">Remaining ({prayerData[2].value})</span>
                    </div>
                </div>
            </div>

            {/* Divider (Mobile hidden) */}
            <div className="hidden md:block w-px h-32 bg-gray-100"></div>

            {/* Right: Details / Fasting */}
            <div className="flex-1 w-full space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">Today's Worship</h3>
                    <button onClick={() => navigate('/muslim')} className="text-xs text-amber-500 font-medium hover:underline">Manage</button>
                </div>

                {/* Fasting Card */}
                <div className={`p-4 rounded-2xl border flex items-center gap-4 ${fastingInfo.bg}`}>
                    <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm ${fastingInfo.color}`}>
                        <fastingInfo.icon size={20} />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Fasting Status</div>
                        <div className={`text-base font-bold ${fastingInfo.color === 'text-gray-400' ? 'text-gray-600' : 'text-indigo-900'}`}>
                            {fastingInfo.label}
                        </div>
                    </div>
                </div>

                {/* Encouragement / Next Prayer */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle2 size={16} className="text-amber-500" />
                    <span>Jaga sholat tepat waktu ya!</span>
                </div>
            </div>
        </div>
    );
};

export default WorshipSummary;
