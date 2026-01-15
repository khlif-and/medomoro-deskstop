import React from 'react';
import PomodoroWidget from '../organisms/PomodoroWidget';

const PodomoroTemplate = () => {
    console.log("PodomoroTemplate Rendered");
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            {/* Debug Text - Remove after fix */}
            {/* <h1 className="text-gray-400">Podomoro Page Loaded</h1> */}
            <PomodoroWidget />
        </div>
    );
};

export default PodomoroTemplate;
