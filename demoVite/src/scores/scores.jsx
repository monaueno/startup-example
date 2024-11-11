import React, { useState, useEffect } from 'react';

export function Scores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('scores')) || [];
    setScores(storedScores);
  }, []);

  const scoreRows = scores.length
    ? scores.map((score, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{score.name.split('@')[0]}</td>
          <td>{score.score}</td>
          <td>{score.date}</td>
        </tr>
      ))
    : (
        <tr>
          <td colSpan="4">Be the first to score</td>
        </tr>
      );

  return (
    <main className="container-fluid bg-secondary text-center">
      <table className="table table-warning table-striped-columns">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{scoreRows}</tbody>
      </table>
    </main>
  );
}
