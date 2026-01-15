import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowUpRight } from 'lucide-react';
import { usePomodoroStore } from '../../store/usePomodoroStore';

const ActivityCharts = () => {
    const { totalActivityTime, dailyHistory } = usePomodoroStore();

    // Convert total minutes to hours formatting (e.g. 1.5 h)
    const hours = totalActivityTime ? (totalActivityTime / 60).toFixed(1) : '0';

    // Generate last 7 days data (or current week S to S) 
    // For simplicity, let's show the *current week* (Sun - Sat) based on today's date
    const data = useMemo(() => {
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const today = new Date();
        const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - currentDay); // Go back to Sunday

        const weekData = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            const dateString = date.toISOString().split('T')[0];

            // Get minutes from history or 0
            const value = dailyHistory && dailyHistory[dateString] ? dailyHistory[dateString] : 0;

            weekData.push({
                name: days[i],
                value: value,
                date: dateString,
                isToday: i === currentDay
            });
        }
        return weekData;
    }, [dailyHistory]);

    // Find the highest value to display comfortably
    const maxVal = Math.max(...data.map(d => d.value));

    // Find the entry with max value to position the floating badge (optional logic, kept simple here to just show max)
    const maxEntry = data.find(d => d.value === maxVal && maxVal > 0);

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm h-[320px] flex flex-col relative w-full">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-medium text-gray-900">Progress</h3>
                    <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-4xl font-light text-gray-900">{hours} h</span>
                        <span className="text-xs text-gray-400 font-medium leading-tight w-16">Work Time Total</span>
                    </div>
                </div>

                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                    <ArrowUpRight size={16} />
                </button>
            </div>

            <div className="flex-1 w-full min-h-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={6}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#9CA3AF' }}
                            dy={10}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            formatter={(value) => [`${value} mins`, 'Focus Time']}
                        />
                        <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell - ${index} `} fill={entry.isToday ? '#FCD34D' : (entry.value > 0 ? '#1F2937' : '#E5E7EB')} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

                {/* Floating badge for the highest bar (only if there is data) */}
                {maxVal > 0 && maxEntry && (
                    <div className="absolute top-[30%] right-[10%] bg-amber-300 px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm animate-bounce">
                        Max: {Math.floor(maxVal / 60)}h {maxVal % 60}m
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityCharts;
