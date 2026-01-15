import React from 'react';
import MoodButton from '../molecules/MoodButton';
import { Smile, Meh, Frown, Sunrise, Moon, CloudRain } from 'lucide-react';

const MoodTracker = ({ selectedMood, onSelectMood }) => {
    const moods = [
        { id: 'happy', icon: Smile, label: 'Happy', color: 'text-yellow-500', bg: 'bg-yellow-50' },
        { id: 'neutral', icon: Meh, label: 'Neutral', color: 'text-gray-500', bg: 'bg-gray-50' },
        { id: 'sad', icon: Frown, label: 'Sad', color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'productive', icon: Sunrise, label: 'Productive', color: 'text-orange-500', bg: 'bg-orange-50' },
        { id: 'tired', icon: Moon, label: 'Tired', color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { id: 'gloomy', icon: CloudRain, label: 'Gloomy', color: 'text-slate-500', bg: 'bg-slate-50' },
    ];

    return (
        <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-fit">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Current Mood</h2>
                <p className="text-sm text-gray-400 mb-6">How are you feeling?</p>

                <div className="grid grid-cols-3 gap-3">
                    {moods.map((m) => (
                        <MoodButton
                            key={m.id}
                            mood={m}
                            isSelected={selectedMood === m.id}
                            onClick={() => onSelectMood(m.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MoodTracker;
