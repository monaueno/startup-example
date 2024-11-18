import React from 'react';

import { Workers } from './ClockIn/workers.jsx';
import { TimeClock } from './ClockIn/timeclock.jsx'
import { LogTimeProvider } from './ClockIn/LogTime.jsx';
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