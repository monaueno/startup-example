import React, { useState, useEffect } from 'react';
import './about.css';
import placeholder from '../../placeholder.jpg'; // Ensure the path is correct based on your setup

export function About() {
  const [imageUrl, setImageUrl] = useState(placeholder); // Default to local placeholder image
  const [quote, setQuote] = useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = useState('unknown');

  useEffect(() => {
    // Simulate fetching data
    setImageUrl(placeholder); // Update this to a fetched URL if necessary
    setQuote('Words are cheap. Show me the code.');
    setQuoteAuthor('Linus Torvalds');
  }, []);

  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        <div id="picture" className="picture-box">
          <img src={imageUrl} alt="random image" />
        </div>

        <div id="quote" className="quote-box bg-light text-dark">
          <p className="quote">{quote}</p>
          <p className="author">{quoteAuthor}</p>
        </div>
      </div>
    </main>
  );
}
