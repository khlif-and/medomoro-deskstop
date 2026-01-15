import React from 'react';
import { Copy, Terminal } from 'lucide-react';

const SnippetCard = ({ title, language, code }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 flex flex-col h-full group">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-950 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-gray-500" />
                    <span className="text-xs font-semibold text-gray-300">{title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-gray-600 uppercase">{language}</span>
                    <button
                        onClick={copyToClipboard}
                        className="text-gray-500 hover:text-white transition-colors"
                    >
                        <Copy size={14} />
                    </button>
                </div>
            </div>
            <div className="p-4 overflow-x-auto custom-scrollbar flex-1 bg-gray-900/50">
                <pre className="text-xs font-mono text-gray-300 leading-relaxed">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
};

export default SnippetCard;
