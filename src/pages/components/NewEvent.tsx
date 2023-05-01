import React from 'react';
import { useRouter } from 'next/router';

const NewEvent = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description, date, location } = event.currentTarget;
    const body = {
      // @ts-ignore
      name: title.value,
      description: description.value,
      date: date.value,
      location: location.value,
    };
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      router.reload();
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Name</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="description">Description</label>
      <textarea name="description" id="description" />
      <label htmlFor="date">Date</label>
      <input type="date" name="date" id="date" />
      <label htmlFor="location">Location</label>
      <input type="text" name="location" id="location" />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default NewEvent;
