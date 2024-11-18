import React from 'react';

import { Workers } from './workers.jsx';
import { TimeClock } from './timeclock.js'
import { LogTimeProvider } from './ClockIn/LogTime.js';
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