import React, { useState } from 'react';
import { ChevronDown, Laptop, Zap, Gift, FileText, ChevronRight, MoreVertical } from 'lucide-react';

const SideMenu = () => {
    const [openSection, setOpenSection] = useState('Devices');

    const menuItems = [
        { title: 'Pension contributions', icon: null },
        {
            title: 'Devices',
            icon: null,
            content: (
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 mt-2">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white">
                        <Laptop size={18} />
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-bold text-gray-900">{window.electron?.hostname || 'My Device'}</div>
                        <div className="text-xs text-gray-500">{window.electron?.platform === 'Windows_NT' ? 'Windows' : window.electron?.platform} {window.electron?.version ? `(${window.electron.version})` : ''}</div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={16} />
                    </button>
                </div>
            )
        },
        { title: 'Compensation Summary', icon: null },
        { title: 'Employee Benefits', icon: null },
    ];

    return (
        <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
                <div key={item.title} className="bg-transparent">
                    <button
                        onClick={() => setOpenSection(openSection === item.title ? null : item.title)}
                        className="w-full flex items-center justify-between py-3 px-1 text-gray-800 font-medium hover:text-gray-600 transition-colors"
                    >
                        <span>{item.title}</span>
                        {openSection === item.title ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>

                    {openSection === item.title && item.content && (
                        <div className="pb-2 animate-in fade-in slide-in-from-top-2 duration-200">
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SideMenu;
