import React, { useState } from 'react';
import { supabase } from '../supabaseClient';


function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    event_id: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('registrations')
      .insert([formData]);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Registration successful!');
      setFormData({ name: '', email: '', event_id: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register for an Event</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      /><br />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
      /><br />
      <input
        name="event_id"
        type="number"
        value={formData.event_id}
        onChange={handleChange}
        placeholder="Event ID"
        required
      /><br />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
