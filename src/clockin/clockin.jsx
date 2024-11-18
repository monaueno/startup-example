import React from 'react';

import { Workers } from './workers.jsx';
import { TimeClock } from './timeclock.jsx'
import { LogTimeProvider } from './LogTime.jsx';
import './ClockIn.css'

export function ClockIn(props) {
    return (
        <LogTimeProvider>
            <main className="bg-secondary">
                <Workers />
                <TimeClock userName={props.userName} />
            </main>
        </LogTimeProvider>
    );
}