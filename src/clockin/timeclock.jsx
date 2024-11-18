import React, { useState, useEffect } from 'react';
import { useLogTime } from './clockin/LogTime';
import './timeclock.css';

export function TimeClock({ userName }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const { addLog } = useLogTime();

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleClockIn = () => {
        const time = currentTime.toLocaleString();
        addLog('Clock In', time);
    };

    const handleClockOut = () => {
        const time = currentTime.toLocaleString();
        addLog('Clock Out', time);
    };

    return (
        <div className="timeclock-container text-center">
            <h1>Time Clock</h1>
            <div className="current-time">
                <h2>Current Time: {currentTime.toLocaleTimeString()}</h2>
            </div>
            <div className="clock-buttons">
                <button onClick={handleClockIn} className="btn btn-success">
                    Clock In
                </button>
                <button onClick={handleClockOut} className="btn btn-danger">
                    Clock Out
                </button>
            </div>
        </div>
    );
}
