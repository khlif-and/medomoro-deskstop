import React, { useState, useMemo, useEffect } from 'react';
import { useMuslimStore } from '../../store/useMuslimStore';
import { Calendar, Moon, Sun, Heart, BookOpen, Clock, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, Quote } from 'lucide-react';
import PrayerReportCard from '../organisms/PrayerReportCard';



const PrayerRow = ({ name, data, onMarkDone, onChange }) => {
    const statusColors = {
        ontime: 'bg-green-100 text-green-700 border-green-200',
        late: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        missed: 'bg-red-100 text-red-700 border-red-200'
    };

    const isFilled = !!data?.time;

    return (
        <div className="relative flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors 
                    ${isFilled ? 'bg-amber-100 text-amber-600' : 'bg-gray-50 text-gray-400'}`}>
                    <Clock size={20} />
                </div>
                <span className="font-semibold text-gray-700 capitalize w-20">{name}</span>
            </div>

            <div className="flex items-center gap-4">
                {/* Automation Button */}
                {!isFilled && (
                    <button
                        onClick={() => onMarkDone(name)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                        <CheckCircle2 size={16} />
                        Pray Now
                    </button>
                )}

                {/* Manual Edit / Display */}
                {isFilled && (
                    <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4">
                        <input
                            type="time"
                            value={data?.time || ''}
                            onChange={(e) => onChange(name, e.target.value, data?.status || 'ontime')}
                            className="p-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-400 text-sm font-semibold text-gray-800"
                        />

                        <div className="flex gap-2">
                            {['ontime', 'late', 'missed'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => onChange(name, data?.time || '', status)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${data?.status === status
                                        ? statusColors[status]
                                        : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {status === 'ontime' ? 'On Time' : status === 'late' ? 'Late' : 'Missed'}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const HabitCard = ({ icon: Icon, label, active, onClick, colorClass, children }) => (
    <div className={`flex flex-col p-6 rounded-3xl border transition-all w-full relative overflow-hidden
        ${active
            ? `${colorClass} shadow-sm ring-1 ring-inset`
            : 'bg-white border-gray-100 hover:border-gray-200 text-gray-400 hover:bg-gray-50'
        }
    `}>
        <button onClick={onClick} className="flex flex-col items-center justify-center w-full z-10">
            <Icon size={32} className={`mb-3 ${active ? '' : 'opacity-50'}`} />
            <span className={`font-medium ${active ? 'font-semibold' : ''}`}>{label}</span>
            {active && !children && <div className="mt-2 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">COMPLETED</div>}
        </button>
        {active && children && (
            <div className="mt-4 pt-4 border-t border-black/5 z-20">
                {children}
            </div>
        )}
    </div>
);

const MuslimTemplate = () => {
    const todayStr = new Date().toLocaleDateString('en-CA');
    const [selectedDate, setSelectedDate] = useState(todayStr);

    const { dailyRecords, updatePrayer, markPrayerAsDone, toggleHabit, setFastingType, lastRead, updateLastRead } = useMuslimStore();

    // Get data for selected date
    const record = dailyRecords[selectedDate] || {
        prayers: { fajr: {}, dhuhr: {}, asr: {}, maghrib: {}, isha: {} },
        habits: { fasting: false, fastingType: '', sahur: false, goodDeed: false, quranRead: false }
    };

    const handlePrayerChange = (name, time, status) => {
        updatePrayer(selectedDate, name, time, status);
    };

    const handleMarkDone = (name) => {
        markPrayerAsDone(selectedDate, name);
    };

    const handleDateChange = (offset) => {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() + offset);
        setSelectedDate(date.toLocaleDateString('en-CA'));
    };

    // Fasting Types
    const fastingTypes = [
        { id: 'senin_kamis', label: 'Senin Kamis' },
        { id: 'ayyamul_bidh', label: 'Ayyamul Bidh' },
        { id: 'daud', label: 'Puasa Daud' },
        { id: 'wajib', label: 'Qadha / Wajib' },
        { id: 'other', label: 'Lainnya' }
    ];

    return (
        <div className="w-full min-h-full p-4 pt-28 pb-12">
            {/* Header Date Nav */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Ibadah Tracker</h2>
                    <h1 className="text-3xl font-light text-gray-900">
                        {new Date(selectedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </h1>
                </div>
                <div className="flex gap-2 bg-white p-1 rounded-full shadow-sm border border-gray-100">
                    <button onClick={() => handleDateChange(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => setSelectedDate(todayStr)} className="px-4 text-sm font-semibold text-gray-600 hover:text-gray-900">Today</button>
                    <button onClick={() => handleDateChange(1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Left Column: Prayers & Report */}
                <div className="col-span-12 lg:col-span-7 space-y-4">
                    {/* NEW: Report Section at Top */}
                    {/* NEW: Report Section at Top */}
                    <PrayerReportCard dailyRecord={record} date={selectedDate} />

                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <Clock size={20} className="text-amber-500" />
                        Daily Prayers
                    </h3>
                    {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((p) => (
                        <PrayerRow
                            key={p}
                            name={p}
                            data={record.prayers[p]}
                            onMarkDone={handleMarkDone}
                            onChange={handlePrayerChange}
                        />
                    ))}
                </div>

                {/* Right Column: Habits & Quran */}
                <div className="col-span-12 lg:col-span-5 space-y-8">
                    {/* Habits Grid */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <Heart size={20} className="text-red-500" />
                            Daily Habits
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <HabitCard
                                icon={Moon}
                                label="Fasting"
                                active={record.habits.fasting}
                                onClick={() => toggleHabit(selectedDate, 'fasting')}
                                colorClass="bg-indigo-50 text-indigo-600 border-indigo-200"
                            >
                                {/* Dropdown for Fasting Type */}
                                <select
                                    value={record.habits.fastingType || ''}
                                    onChange={(e) => setFastingType(selectedDate, e.target.value)}
                                    onClick={(e) => e.stopPropagation()} // Prevent card toggle
                                    className="w-full mt-1 p-2 bg-white/50 border border-indigo-100 rounded-lg text-xs font-medium focus:outline-none"
                                >
                                    <option value="">Select Type...</option>
                                    {fastingTypes.map(t => (
                                        <option key={t.id} value={t.id}>{t.label}</option>
                                    ))}
                                </select>
                            </HabitCard>

                            <HabitCard
                                icon={Sun}
                                label="Sahur"
                                active={record.habits.sahur}
                                onClick={() => toggleHabit(selectedDate, 'sahur')}
                                colorClass="bg-orange-50 text-orange-600 border-orange-200"
                            />
                            <HabitCard
                                icon={Heart}
                                label="Good Deed"
                                active={record.habits.goodDeed}
                                onClick={() => toggleHabit(selectedDate, 'goodDeed')}
                                colorClass="bg-pink-50 text-pink-600 border-pink-200"
                            />
                            <HabitCard
                                icon={BookOpen}
                                label="Quran"
                                active={record.habits.quranRead}
                                onClick={() => toggleHabit(selectedDate, 'quranRead')}
                                colorClass="bg-emerald-50 text-emerald-600 border-emerald-200"
                            />
                        </div>
                    </div>

                    {/* Quran Progress */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <BookOpen size={20} className="text-emerald-500" />
                            Last Read Progress
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Surah Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Al-Kahf"
                                    value={lastRead.surah}
                                    onChange={(e) => updateLastRead({ surah: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-400"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Ayat</label>
                                    <input
                                        type="number"
                                        placeholder="1"
                                        value={lastRead.ayat}
                                        onChange={(e) => updateLastRead({ ayat: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Juz</label>
                                    <input
                                        type="number"
                                        placeholder="1"
                                        value={lastRead.juz}
                                        onChange={(e) => updateLastRead({ juz: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MuslimTemplate;
