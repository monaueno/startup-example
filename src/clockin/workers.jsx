import React from 'react';
import { useLogTime } from './logtime';
import './workers.css'

export function Workers(){
    const { messages } = useLogTime();

    return (
        <div className="workers-container">
            <h2>Workers' Activity Log</h2>
            {messages.length === 0 ? (
                <p>No activity logged yet.</p>
            ) : (
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}