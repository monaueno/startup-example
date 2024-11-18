import React from 'react';
import { uLink, useNavigate } from 'react-router-dom';
import { useLogTime } from '../clockin/LogTime';
import './MyPay.css';

export default function MyPay() {
    const navigate = useNavigate();
    const { calculatePay } = useLogTime();

    const { payEntries, totalPay, totalHours } = calculatePay();

    return (
        <div>
            <main>
                <h1>Payroll</h1>
                <section className="last-entry" aria-label="Last payroll entry">
                    <h3>Total Earnings</h3>
                    <h2 className="amount">{totalPay}</h2>
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
                            {payEntries.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.date}</td>
                                    <td>{entry.amount}</td>
                                    <td>{entry.hours}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}
