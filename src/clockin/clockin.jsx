import React from 'react';

import { Workers } from './workers.jsx';
import { TimeClock } from './timeclock.jsx'
import { LogTimeProvider } from './logtime.jsx';
import './ClockIn.css'

export default function ClockIn(props) {
    return (
        <LogTimeProvider>
            <main className="bg-secondary">
                <TimeClock userName={props.userName} />
                <Workers />
            </main>
        </LogTimeProvider>
    );
}