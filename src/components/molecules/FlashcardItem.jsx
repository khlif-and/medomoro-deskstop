import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const FlashcardItem = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Prevent flip when selecting text or scrolling
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className="group h-80 w-full [perspective:1000px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>

                {/* Front (Question) */}
                <div className="absolute inset-0 h-full w-full rounded-2xl bg-white p-6 shadow-sm [backface-visibility:hidden] border border-gray-100 flex flex-col">
                    <div className="flex-shrink-0 flex justify-between items-start mb-4">
                        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Question</span>
                        <RotateCcw size={16} className="text-gray-300" />
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex items-center justify-center">
                        <p className="text-lg font-semibold text-gray-800 text-center leading-relaxed w-full">
                            {question}
                        </p>
                    </div>

                    <div className="flex-shrink-0 text-center text-xs text-gray-400 mt-4">Click to flip</div>
                </div>

                {/* Back (Answer) */}
                <div className="absolute inset-0 h-full w-full rounded-2xl bg-gray-900 p-6 shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col">
                    <div className="flex-shrink-0 flex justify-between items-start mb-4">
                        <span className="bg-gray-800 text-gray-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Answer</span>
                        <RotateCcw size={16} className="text-gray-600" />
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex items-start">
                        <p className="text-lg font-medium text-white text-left leading-relaxed w-full whitespace-pre-wrap">
                            {answer}
                        </p>
                    </div>

                    <div className="flex-shrink-0 text-center text-xs text-gray-600 mt-4">Click to flip back</div>
                </div>
            </div>
        </div>
    );
};

export default FlashcardItem;
