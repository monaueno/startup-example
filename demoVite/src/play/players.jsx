import React, { useEffect, useState } from 'react';
import { GameNotifier } from './gameNotifier'; // Assuming `gameNotifier.js` handles notifications

export function Players() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const handleGameEvent = (event) => {
      setEvents((prevEvents) => {
        const newEvents = [event, ...prevEvents];
        return newEvents.length > 10 ? newEvents.slice(0, 10) : newEvents;
      });
    };

    GameNotifier.addHandler(handleGameEvent);
    return () => GameNotifier.removeHandler(handleGameEvent);
  }, []);

  return (
    <div className="players">
      {events.map((event, index) => (
        <div key={index} className="event">
          <span className="player-event">{event.user}</span> {event.message}
        </div>
      ))}
    </div>
  );
}
