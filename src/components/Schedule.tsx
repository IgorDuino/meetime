'use client'
import React, { useState } from 'react';

const Schedule: React.FC = () => {
    const initialColors = Array.from({ length: 60 }, () => 'border border-gray-300 h-8');
    const [colors, setColors] = useState(initialColors);

    const handleClick = (index) => {
        setColors((prevColors) => {
            const newColors = [...prevColors];
            const currentColor = newColors[index];
            const colorOrder = ['border border-gray-300 h-8', 'bg-green-400 h-8'];
            newColors[index] = colorOrder[(colorOrder.indexOf(currentColor) + 1) % colorOrder.length];
            return newColors;
        });
    };

    return (
        <div className="w-1/2 flex space-x-8">
            <div>
                <div className="grid grid-cols-4 gap-2 text-center">
                    <div></div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    {/* Timeslots */}
                    {Array.from({ length: 10 }, (_, i) => (
                        <React.Fragment key={i}>
                            <div>{9 + i}:00</div>
                            <div className={colors[i * 3]} onClick={() => handleClick(i * 3)}></div>
                            <div className={colors[i * 3 + 1]} onClick={() => handleClick(i * 3 + 1)}></div>
                            <div className={colors[i * 3 + 2]} onClick={() => handleClick(i * 3 + 2)}></div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div>
                <div className="grid grid-cols-4 gap-2 text-center">
                    <div></div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    {/* Timeslots with colors */}
                    {Array.from({length: 10}, (_, i) => (
                        <>
                            <div>{9 + i}:00</div>
                            <div className={`bg-green-${500 - i * 100} border border-gray-300 h-8`}></div>
                            <div className="border border-gray-300 h-8"></div>
                            <div className="border border-gray-300 h-8"></div>
                        </>
                    ))}
                </div>
                <div className="mt-4">
                    <div className="flex items-center space-x-2">
                        <div className="bg-green-500 h-4 w-8"></div>
                        <span>100%</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <div className="bg-green-400 h-4 w-8"></div>
                        <span>70%</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <div className="bg-green-300 h-4 w-8"></div>
                        <span>50%</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <div className="bg-green-100 h-4 w-8"></div>
                        <span>&lt; 50%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
