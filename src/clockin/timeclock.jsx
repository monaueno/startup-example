import React, { useState, useEffect } from 'react';
import { useLogTime } from './logtime';
import './timeclock.css';

export function TimeClock({ userName }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const { logs, addLog } = useLogTime();

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

    // Sort logs by date and time in descending order (most recent first)
    const sortedLogs = [...logs].sort((a, b) => new Date(b.time) - new Date(a.time));

    // Get the most recent log entry
    const mostRecentLog = sortedLogs.length > 0 ? sortedLogs[0] : null;

    // Extract the time portion (without the date) for the most recent log
    const getTimeOnly = (timeString) => {
        return timeString.split(', ')[1];
    };

    // Format the action to capitalize the first letter
    const formatAction = (action) => {
        return action === 'Clock In' ? 'Clocked In' : 'Clocked Out';
    };

    return (
        <div className="timeclock-container text-center">
            {mostRecentLog && (
                <div className="recent-log-display">
                    <h1>You {formatAction(mostRecentLog.action)} at {getTimeOnly(mostRecentLog.time)}</h1>
                </div>
            )}
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
