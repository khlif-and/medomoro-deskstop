import React from 'react';

const CalendarYearView = ({ currentDate, onMonthSelect }) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentMonth = currentDate.getMonth();

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 h-full">
            <h2 className="text-3xl font-light text-gray-900 mb-8">{currentDate.getFullYear()}</h2>

            <div className="grid grid-cols-3 gap-6">
                {months.map((month, index) => (
                    <button
                        key={month}
                        onClick={() => onMonthSelect(index)}
                        className={`
                            p-6 rounded-2xl text-left transition-all group border hover:shadow-md
                            ${index === currentMonth
                                ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105'
                                : 'bg-white border-gray-100 hover:border-amber-200'
                            }
                        `}
                    >
                        <h3 className={`text-xl font-medium mb-1 ${index === currentMonth ? 'text-white' : 'text-gray-900'}`}>
                            {month.substring(0, 3)}
                        </h3>
                        <p className={`text-sm ${index === currentMonth ? 'text-gray-400' : 'text-gray-500'}`}>
                            {month}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CalendarYearView;
