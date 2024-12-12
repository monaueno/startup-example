import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogTime } from '../clockin/logtime.jsx';
import './MyPay.css';

export default function MyPay() {
    const navigate = useNavigate();
    const { calculatePay } = useLogTime();

    const { payEntries, totalPay, totalHours } = calculatePay();

    // Group payEntries by date and sum the amounts for each date
    const groupedEntries = payEntries.reduce((acc, entry) => {
        const date = entry.date;
        const amount = parseFloat(entry.amount.replace('$', '')); // Convert amount to a number

        if (!acc[date]) {
            acc[date] = { date, amount: 0, hours: 0 };
        }

        acc[date].amount += amount;
        acc[date].hours += parseFloat(entry.hours);

        return acc;
    }, {});

    // Convert the grouped object back to an array and sort by date (most recent first)
    const sortedGroupedEntries = Object.values(groupedEntries).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Get the earnings for the most recent day
    const mostRecentDayEarnings = sortedGroupedEntries.length > 0 ? sortedGroupedEntries[0].amount : 0;

    return (
        <div>
            <main>
                <h1>Payroll</h1>
                <section className="last-entry" aria-label="Last payroll entry">
                <h3>Earnings for Most Recent Day</h3>
                <h2 className="amount">${mostRecentDayEarnings.toFixed(2)}</h2>
                    <p className="hours">Total Hours Worked: {totalHours}</p>
                </section>

                <section aria-label="Payroll history">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Hours Worked</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedGroupedEntries.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.date}</td>
                                    <td>${entry.amount.toFixed(2)}</td>
                                    <td>{entry.hours.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}
