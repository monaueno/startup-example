import React, { useState, useEffect };
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
        addMessage('${userName) clocked in at ${time}')
    };

    const handleClockOut = () =? {
        const time = currentTime.toLocale
    }
}