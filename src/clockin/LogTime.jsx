import React, { createContext, useState, useContext } from 'react';

const LogContext = createContext();

export const LogTimeProvider = ({ children }) => {
    const [logs, setLogs] = useState(() => {
        const savedLogs = localStorage.getItem('logs');
        return savedLogs ? JSON.parse(savedLogs) : [];
    });

    const hourlyRate = 15;

    const addLog = (employee, action, time) => {
        const formattedTime = new Date(time).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });

        setLogs((prevLogs) => {
            const updatedLogs = [...prevLogs, { employee, action, time: formattedTime }];
            localStorage.setItem('logs', JSON.stringify(updatedLogs));
            return updatedLogs;
        });
    };

    // Function to clear all logs
    const clearLogs = () => {
        setLogs([]); // Reset state
        localStorage.removeItem('logs'); // Clear localStorage
    };

    const calculatePay = () => {
        let totalPay = 0;
        let totalHours = 0;
        let lastClockIn = null;

        const payEntries = logs.reduce((acc, log) => {
            if (log.action === 'Clock In') {
                lastClockIn = new Date(log.time);
            } else if (log.action === 'Clock Out' && lastClockIn) {
                const clockOutTime = new Date(log.time);
                const hoursWorked = (clockOutTime - lastClockIn) / (1000 * 60 * 60);
                const pay = hoursWorked * hourlyRate;

                totalHours += hoursWorked;
                totalPay += pay;

                acc.push({
                    date: new Date(log.time).toLocaleDateString(),
                    hours: hoursWorked.toFixed(2),
                    amount: `$${pay.toFixed(2)}`,
                });

                lastClockIn = null;
            }
            return acc;
        }, []);

        return { payEntries, totalPay: `$${totalPay.toFixed(2)}`, totalHours: totalHours.toFixed(2) };
    };

    return (
        <LogContext.Provider value={{ logs, addLog, clearLogs, calculatePay }}>
            {children}
        </LogContext.Provider>
    );
};

export const useLogTime = () => {
    return useContext(LogContext);
};
