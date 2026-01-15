import React from 'react';
import { ExternalLink, BookOpen, Video, FileText, Globe, Star, Code, Lightbulb, Bookmark } from 'lucide-react';

const icons = {
    book: { icon: BookOpen, color: 'text-amber-500', bg: 'bg-amber-50' },
    video: { icon: Video, color: 'text-red-500', bg: 'bg-red-50' },
    article: { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
    web: { icon: Globe, color: 'text-sky-500', bg: 'bg-sky-50' },
    star: { icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    code: { icon: Code, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    idea: { icon: Lightbulb, color: 'text-purple-500', bg: 'bg-purple-50' },
    bookmark: { icon: Bookmark, color: 'text-pink-500', bg: 'bg-pink-50' },
};

const ResourceItem = ({ title, type, progress, url, iconName, onClick }) => {

    // Default config based on iconName or fallback to type or 'book'
    const config = icons[iconName] || icons[type] || icons['book'];
    const Icon = config.icon;

    const handleOpenLink = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            onClick={onClick}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all group cursor-pointer"
        >
            <div className={`p-3 rounded-lg ${config.bg}`}>
                <Icon size={18} className={config.color} />
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 text-sm truncate">{title}</h4>
                <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${progress}%`,
                                backgroundColor: progress === 100 ? '#10b981' : '#3b82f6'
                            }}
                        />
                    </div>
                    <span className="text-[10px] font-medium text-gray-400 w-8">{progress}%</span>
                </div>
            </div>

            <a
                href={url}
                onClick={handleOpenLink}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-50 rounded-lg text-gray-400 transition-all"
            >
                <ExternalLink size={16} />
            </a>
        </div>
    );
};

export default ResourceItem;
