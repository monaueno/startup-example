import React, { useState, useEffect } from react;
import { useLogTime } from "./LogTime";
import './timeclock.css'

export function TimeClock({ userName }){
    const [currentTime, setCurrentTime] = useState(new Date());
    const { addMessage } = useLogTime();

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleClockIn = () => {
        const time = currentTime.toLocaleTimeString();
        addMessage('${userName}clocked in at ${time}')
    };

    const handleClockOut = () => {
        const time = currentTime.toLocaleTimeString();
        addMessage('${userName} clocked out at ${time}')
    };
    
    return(
        <div className="timeclock-container text-center">
            <h1>Time Clock</h1>
            <div className="current-time">
                <h2>Current Time: {currentTime.toLocaleTimeString()}</h2>
            </div>
            <div className="clock-buttons">
                <button onClick={handleClockIn} className="btn btn-success">
                    Clock In
                </button>
                <button onClick={handleClockOut} className="btn btn-success">
                    Clock Out
                </button>
            </div>
        </div>
    );
}