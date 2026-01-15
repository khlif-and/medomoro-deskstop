import React from 'react';
import StatsOverview from '../organisms/StatsOverview';
import ProfileCard from '../organisms/ProfileCard';
import SideMenu from '../organisms/SideMenu';
import ActivityCharts from '../organisms/ActivityCharts';
import TimeTracker from '../organisms/TimeTracker';
import CalendarTimeline from '../organisms/CalendarTimeline';
import TaskList from '../organisms/TaskList';

const DashboardTemplate = () => {
    return (
        <div className="w-full min-h-full p-4 pt-28 pb-12">
            <div className="mb-8">
                <h1 className="text-4xl font-normal text-gray-900 mb-6">Welcome in, {window.electron?.username || 'User'}</h1>
                <StatsOverview />
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Left Column - Profile & Menu */}
                <div className="col-span-12 lg:col-span-3">
                    <ProfileCard />
                    <SideMenu />
                </div>

                {/* Center Column - Charts & Calendar */}
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-6">
                        <ActivityCharts />
                        <TimeTracker />
                    </div>
                    <CalendarTimeline />
                </div>

                {/* Right Column - Tasks */}
                <div className="col-span-12 lg:col-span-3">
                    <TaskList />
                </div>
            </div>
        </div>
    );
};

export default DashboardTemplate;
