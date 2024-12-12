import React from 'react';
import { useLogTime } from './logtime';
import './workers.css';

export function Workers() {
    const { logs, clearLogs } = useLogTime();

    // Sort logs so the most recent log is first
    const sortedLogs = [...logs].sort((a, b) => new Date(b.time) - new Date(a.time));

    return (
        <div className="workers-container">
            <h2>Employees' Activity Log</h2>

            <button onClick={clearLogs} className="btn btn-danger" style={{ marginBottom: '1rem' }}>
                Clear All Logs
            </button>

            {sortedLogs.length === 0 ? (
                <p>No activity logged yet.</p>
            ) : (
                <table className="workers-table">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Action</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedLogs.map((log, index) => {
                            const [date, time] = log.time ? log.time.split(', ') : ['Unknown Date', 'Unknown Time'];
                            const employeeName = log.employee ? log.employee.split('@')[0] : 'Employee';
                            return (
                                <tr key={index}>
                                    <td>{employeeName}</td>
                                    <td>{log.action || 'Unknown Action'}</td>
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
