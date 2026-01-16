import React, { useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import CalendarDayView from '../organisms/CalendarDayView';
import CalendarMonthView from '../organisms/CalendarMonthView';
import CalendarYearView from '../organisms/CalendarYearView';
import { Maximize2, Minimize2, Calendar as CalendarIcon } from 'lucide-react';

const VIEWS = {
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day'
};

const CalendarTemplate = () => {
    // State
    const [view, setView] = useState(VIEWS.MONTH);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Data
    const { tasks } = useTaskStore();

    // Handlers
    const handleZoomIn = () => {
        if (view === VIEWS.YEAR) setView(VIEWS.MONTH);
        else if (view === VIEWS.MONTH) setView(VIEWS.DAY);
    };

    const handleZoomOut = () => {
        if (view === VIEWS.DAY) setView(VIEWS.MONTH);
        else if (view === VIEWS.MONTH) setView(VIEWS.YEAR);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setView(VIEWS.DAY); // Auto zoom to day
    };

    const handleMonthSelect = (monthIndex) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(monthIndex);
        setSelectedDate(newDate);
        setView(VIEWS.MONTH); // Auto zoom to month
    };

    const handleMonthChange = (direction) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + direction);
        setSelectedDate(newDate);
    };

    return (
        <div className="w-full h-full p-4 pt-24 max-w-7xl mx-auto flex flex-col gap-6">

            {/* Control Bar */}
            <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                        <CalendarIcon size={24} className="text-gray-900" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-light text-gray-900">Calendar</h1>
                        <p className="text-sm text-gray-500 capitalize">{view} View</p>
                    </div>
                </div>

                <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-100">
                    <button
                        onClick={handleZoomOut}
                        disabled={view === VIEWS.YEAR}
                        className="p-2 rounded-full hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-gray-600"
                        title="Zoom Out (Year)"
                    >
                        <Minimize2 size={20} />
                    </button>
                    <div className="w-px bg-gray-200 my-1"></div>
                    <button
                        onClick={handleZoomIn}
                        disabled={view === VIEWS.DAY}
                        className="p-2 rounded-full hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-gray-600"
                        title="Zoom In (Day)"
                    >
                        <Maximize2 size={20} />
                    </button>
                </div>
            </div>

            {/* View Container */}
            <div className="flex-1 overflow-hidden transition-all duration-300">
                {view === VIEWS.YEAR && (
                    <CalendarYearView
                        currentDate={selectedDate}
                        onMonthSelect={handleMonthSelect}
                    />
                )}

                {view === VIEWS.MONTH && (
                    <CalendarMonthView
                        currentDate={selectedDate}
                        tasks={tasks}
                        onDateClick={handleDateClick}
                        onMonthChange={handleMonthChange}
                    />
                )}

                {view === VIEWS.DAY && (
                    <CalendarDayView
                        currentDate={selectedDate}
                        tasks={tasks}
                    />
                )}
            </div>
        </div>
    );
};

export default CalendarTemplate;
