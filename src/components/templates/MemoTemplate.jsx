import React from 'react';
import FlashcardWidget from '../organisms/FlashcardWidget';
import ResourceLibrary from '../organisms/ResourceLibrary';
import LearningLog from '../organisms/LearningLog';
import { Brain } from 'lucide-react';

const MemoTemplate = () => {
    return (
        <div className="w-full h-full p-6 pt-28 overflow-y-auto pb-20 custom-scrollbar bg-gray-50/50">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <Brain className="text-indigo-500" size={32} />
                    Knowledge Base
                </h1>
                <p className="text-gray-500 mt-1">Track, learn, and master new skills daily.</p>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[800px]">

                {/* Left Column: Learning Log (Editor) */}
                <div className="xl:col-span-8 h-full flex flex-col gap-6">
                    <div className="flex-1 min-h-0">
                        <LearningLog />
                    </div>
                </div>

                {/* Right Column: Widgets */}
                <div className="xl:col-span-4 h-full flex flex-col gap-6 overflow-hidden">
                    <div className="min-h-[300px]">
                        <FlashcardWidget />
                    </div>
                    <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-2">
                        <ResourceLibrary />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemoTemplate;
