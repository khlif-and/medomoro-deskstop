import React from 'react';
import { User } from 'lucide-react';

const CalendarTimeline = () => {
    const days = [
        { day: 'Mon', date: '22', active: false },
        { day: 'Tue', date: '23', active: false },
        { day: 'Wed', date: '24', active: true },
        { day: 'Thu', date: '25', active: false },
        { day: 'Fri', date: '26', active: false },
        { day: 'Sat', date: '27', active: false },
    ];

    return (
        <div className="bg-amber-50 rounded-[32px] p-8 w-full">
            <div className="flex justify-between items-center mb-6">
                <span className="bg-white px-4 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm">August</span>
                <h3 className="text-lg font-medium text-gray-900">September 2024</h3>
                <span className="bg-white px-4 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm">October</span>
            </div>

            <div className="flex justify-between border-b border-gray-200/50 pb-4 mb-4">
                {days.map((d) => (
                    <div key={d.day} className={`text-center ${d.active ? 'opacity-100' : 'opacity-40'}`}>
                        <div className="text-xs font-medium text-gray-500 mb-1">{d.day}</div>
                        <div className="text-lg font-semibold text-gray-900">{d.date}</div>
                    </div>
                ))}
            </div>

            {/* Timeline Grid */}
            <div className="space-y-6 relative">
                <div className="absolute left-[54px] top-0 bottom-0 w-px bg-gray-200 border-l border-dashed border-gray-300"></div>

                {/* Time Slot 8:00 */}
                <div className="flex items-start gap-6 group">
                    <span className="text-xs font-medium text-gray-400 w-10 pt-1">8:00 am</span>
                    <div className="flex-1 h-8"></div>
                </div>

                {/* Time Slot 9:00 with Event */}
                <div className="flex items-start gap-6 group relative">
                    <span className="text-xs font-medium text-gray-400 w-10 pt-1">9:00 am</span>
                    <div className="flex-1">
                        <div className="bg-gray-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg transform translate-x-4">
                            <div>
                                <h4 className="font-medium text-sm">Weekly Team Sync</h4>
                                <p className="text-xs text-gray-400">Discuss progress on projects</p>
                            </div>
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border border-gray-900 flex items-center justify-center text-[10px]">
                                        <User size={12} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Time Slot 10:00 */}
                <div className="flex items-start gap-6 group">
                    <span className="text-xs font-medium text-gray-400 w-10 pt-1">10:00 am</span>
                    <div className="flex-1 h-8"></div>
                </div>

                {/* Time Slot 11:00 with Event */}
                <div className="flex items-start gap-6 group">
                    <span className="text-xs font-medium text-gray-400 w-10 pt-1">11:00 am</span>
                    <div className="flex-1">
                        <div className="bg-white p-3 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100 ml-16 max-w-xs">
                            <div>
                                <h4 className="font-medium text-xs text-gray-900">Onboarding Session</h4>
                                <p className="text-[10px] text-gray-500">Introduction for new hires</p>
                            </div>
                            <div className="flex -space-x-2">
                                {[1, 2].map(i => (
                                    <div key={i} className="w-5 h-5 rounded-full bg-gray-200 border border-white flex items-center justify-center text-[8px]">
                                        <User size={10} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarTimeline;
