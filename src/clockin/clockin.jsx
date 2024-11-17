import React from 'react';

import { Workers } from './workers';
import { TimeClock } from './timeclock'

export function ClockIn(props) {
    return(
        <main className='bg-secondary'>
            <Workers userName={props.userName} />
            <ClockIn userName={props.userName} />
        </main>
    );
}