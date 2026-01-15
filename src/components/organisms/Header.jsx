import React from 'react';
import { Settings, Bell, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Task', path: '/task' },
        { label: 'Podomoro', path: '/pomodoro' },
        { label: 'Journal', path: '/journal' },
        { label: 'Memo', path: '/memo' },
        { label: 'Calendar', path: '/calendar' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-6 font-sans z-50 pointer-events-none">
            {/* Logo Section */}
            <div className="flex-shrink-0 pointer-events-auto">
                <button
                    onClick={() => navigate('/')}
                    className="bg-white border-[1.5px] border-gray-300 text-gray-800 text-xl font-medium px-8 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
                >
                    Medomoro
                </button>
            </div>

            {/* Combined Nav and Actions Container */}
            <div className="bg-white rounded-full pl-2 pr-2 py-2 flex items-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100/50 pointer-events-auto">
                {/* Navigation */}
                <nav className="flex items-center">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive(item.path)
                                ? 'bg-gray-900 text-white shadow-md'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Divider */}
                <div className="w-px h-6 bg-gray-200 mx-4"></div>

                {/* Actions */}
                <div className="flex items-center gap-2 mr-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-full hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        <Settings size={18} strokeWidth={2} />
                        <span>Setting</span>
                    </button>

                    <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50 transition-colors text-gray-700 relative">
                        <Bell size={18} strokeWidth={2} />
                        <span className="absolute top-2.5 right-3 w-1.5 h-1.5 bg-yellow-400 rounded-full ring-1 ring-white"></span>
                    </button>

                    <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50 transition-colors text-gray-700 border border-gray-200">
                        <User size={18} strokeWidth={2} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
