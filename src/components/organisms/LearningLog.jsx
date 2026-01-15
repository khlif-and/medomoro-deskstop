import React, { useState } from 'react';
import { PenTool, Plus } from 'lucide-react';
import LearningLogCard from '../molecules/LearningLogCard';
import LearningLogModal from './LearningLogModal';

const LearningLog = () => {
    // State for Logs
    const [logs, setLogs] = useState(() => {
        const saved = localStorage.getItem('memo-logs');
        return saved ? JSON.parse(saved) : [];
    });

    // State for Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLog, setEditingLog] = useState(null);

    React.useEffect(() => {
        localStorage.setItem('memo-logs', JSON.stringify(logs));
    }, [logs]);

    const handleDeleteLog = (id) => {
        setLogs(logs.filter(log => log.id !== id));
    };

    const handleEditLog = (log) => {
        setEditingLog(log);
        setIsModalOpen(true);
    };

    const handleCreateLog = () => {
        setEditingLog(null);
        setIsModalOpen(true);
    };

    const handleSaveLog = (data) => {
        const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

        if (editingLog) {
            // Edit existing
            setLogs(logs.map(log => log.id === editingLog.id ? { ...log, ...data, date } : log));
        } else {
            // Create new
            const newLog = {
                id: Date.now(),
                date,
                ...data
            };
            setLogs([newLog, ...logs]);
        }
        setIsModalOpen(false);
        setEditingLog(null);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <PenTool className="text-purple-500" size={20} />
                    <h2 className="text-lg font-bold text-gray-800">Learning Logs</h2>
                </div>
                <button
                    onClick={handleCreateLog}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
                >
                    <Plus size={16} />
                    <span>New Log</span>
                </button>
            </div>

            {logs.length > 0 ? (
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-4">
                    {logs.map(log => (
                        <LearningLogCard
                            key={log.id}
                            log={log}
                            onDelete={handleDeleteLog}
                            onEdit={handleEditLog}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                        <PenTool size={24} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">No learning logs yet</p>
                    <p className="text-sm text-gray-400 mt-1 mb-6">Capture your daily knowledge and insights.</p>
                    <button
                        onClick={handleCreateLog}
                        className="text-sm font-medium text-gray-900 border-b border-gray-200 hover:border-gray-900 transition-colors pb-0.5"
                    >
                        Start writing
                    </button>
                </div>
            )}

            <LearningLogModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveLog}
                initialData={editingLog}
            />
        </div>
    );
};

export default LearningLog;
