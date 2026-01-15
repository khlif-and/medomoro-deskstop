import React, { useState } from 'react';
import ResourceItem from '../molecules/ResourceItem';
import { Library, Plus, X, Trash2, BookOpen, Video, FileText, Globe, Star, Code, Lightbulb, Bookmark } from 'lucide-react';

const icons = [
    { name: 'book', icon: BookOpen, color: 'text-amber-500', bg: 'bg-amber-50' },
    { name: 'video', icon: Video, color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'article', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'web', icon: Globe, color: 'text-sky-500', bg: 'bg-sky-50' },
    { name: 'star', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { name: 'code', icon: Code, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { name: 'idea', icon: Lightbulb, color: 'text-purple-500', bg: 'bg-purple-50' },
    { name: 'bookmark', icon: Bookmark, color: 'text-pink-500', bg: 'bg-pink-50' },
];

const ResourceLibrary = () => {
    // Initial data load from localStorage or default
    const [resources, setResources] = useState(() => {
        const saved = localStorage.getItem('memo-resources');
        return saved ? JSON.parse(saved) : [];
    });

    const [isCreating, setIsCreating] = useState(false);
    // Form States
    const [title, setTitle] = useState('');
    const [type, setType] = useState('article');
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [selectedIconName, setSelectedIconName] = useState('article');
    const [editingId, setEditingId] = useState(null);

    React.useEffect(() => {
        localStorage.setItem('memo-resources', JSON.stringify(resources));
    }, [resources]);

    const handleCreateClick = () => {
        setTitle('');
        setType('article');
        setUrl('');
        setProgress(0);
        setSelectedIconName('article');
        setEditingId(null);
        setIsCreating(true);
    };

    const handleEditClick = (res) => {
        setTitle(res.title);
        setType(res.type);
        setUrl(res.url);
        setProgress(res.progress);
        setSelectedIconName(res.iconName || 'article');
        setEditingId(res.id);
        setIsCreating(true);
    };

    const handleSaveResource = () => {
        if (!title.trim()) return;

        if (editingId) {
            // Update Existing
            setResources(resources.map(res =>
                res.id === editingId ? { ...res, title, type, url: url || '#', progress, iconName: selectedIconName } : res
            ));
        } else {
            // Create New
            const newResource = {
                id: Date.now(),
                title,
                type,
                progress,
                url: url || '#' || 'https://google.com',
                iconName: selectedIconName
            };
            setResources([...resources, newResource]);
        }

        setIsCreating(false);
        setEditingId(null);
    };

    const handleDeleteResource = (e, id) => {
        e.stopPropagation();
        setResources(resources.filter(res => res.id !== id));
        if (editingId === id) setIsCreating(false);
    };

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Library className="text-amber-500" size={20} />
                    <h2 className="text-lg font-bold text-gray-800">Resource Library</h2>
                </div>
                <button
                    onClick={handleCreateClick}
                    className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <Plus size={18} />
                </button>
            </div>

            {/* Add/Edit Resource Form */}
            {isCreating && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-gray-400 uppercase">{editingId ? 'Edit Resource' : 'New Resource'}</span>
                        <button onClick={() => setIsCreating(false)}><X size={14} className="text-gray-400 hover:text-gray-600" /></button>
                    </div>
                    <div className="space-y-3">
                        <input
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500"
                            placeholder="Title..."
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <input
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500"
                            placeholder="URL (optional)..."
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />

                        {/* Icon Selection */}
                        <div>
                            <span className="text-xs text-gray-400 block mb-2">Select Icon</span>
                            <div className="flex gap-2 bg-gray-50 p-2 rounded-lg overflow-x-auto custom-scrollbar">
                                {icons.map((item) => {
                                    const Icon = item.icon;
                                    const isSelected = selectedIconName === item.name;
                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => setSelectedIconName(item.name)}
                                            className={`p-2 rounded-lg transition-all ${isSelected ? 'bg-white shadow-sm ring-1 ring-amber-500' : 'hover:bg-white hover:shadow-sm'}`}
                                            title={item.name}
                                        >
                                            <Icon size={18} className={item.color} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Progress Slider */}
                        <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{progress}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={e => setProgress(Number(e.target.value))}
                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                        </div>

                        <div className="flex gap-2">
                            {['book', 'video', 'article', 'course'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`px-3 py-1 rounded-md text-xs font-medium capitalize border ${type === t ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleSaveResource}
                            className="w-full py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                        >
                            {editingId ? 'Update Resource' : 'Add to Library'}
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map(res => (
                    <div key={res.id} className="relative group">
                        <ResourceItem
                            title={res.title}
                            type={res.type}
                            progress={res.progress}
                            url={res.url}
                            iconName={res.iconName}
                            onClick={() => handleEditClick(res)}
                        />
                        <button
                            onClick={(e) => handleDeleteResource(e, res.id)}
                            className="absolute -top-2 -right-2 bg-white text-gray-400 hover:text-red-500 border border-gray-100 shadow-sm p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourceLibrary;
