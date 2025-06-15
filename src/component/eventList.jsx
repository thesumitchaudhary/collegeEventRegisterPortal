import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong><br />
            {event.description}<br />
            <small>{event.date} @ {event.location}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
