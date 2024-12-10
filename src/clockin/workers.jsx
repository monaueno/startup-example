import React from 'react';
import { useLogTime } from './logtime';
import './workers.css';

export function Workers() {
    const { logs } = useLogTime();

    // Sort logs so the most recent log is first
    const sortedLogs = [...logs].sort((a, b) => new Date(b.time) - new Date(a.time));

    return (
        <div className="workers-container">
            <h2>Employees' Activity Log</h2>

            {sortedLogs.length === 0 ? (
                <p>No activity logged yet.</p>
            ) : (
                <table className="workers-table">
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedLogs.map((log, index) => {
                            const [date, time] = log.time.split(', ');
                            return (
                                <tr key={index}>
                                    <td>{log.action}</td>
                                    <td>{date}</td>
                                    <td>{time}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}
