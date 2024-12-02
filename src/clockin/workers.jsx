import React from 'react';
import { useLogTime } from './logtime';
import './workers.css'

export function Workers(){
    const { logs } = useLogTime();

    return (
        <div className="workers-container">
            <h2>Workers' Activity Log</h2>
            {logs.length === 0 ? (
                <p>No activity logged yet.</p>
            ) : (
                <ul>
                    {logs.map((log, index) => (
                        <li key={index}>
                            <strong>{log.action}</strong> at {log.time}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}