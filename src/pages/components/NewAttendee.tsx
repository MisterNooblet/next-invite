import React from 'react';
import { useRouter } from 'next/router';

const NewAttendee = () => {
  const router = useRouter();
  const { eid } = router.query;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, telephone } = event.currentTarget;
    const body = {
      attendee: {
        // @ts-ignore
        name: name.value,
        telephone: telephone.value,
      },
    };
    try {
      const response = await fetch(`/api/event/${eid}`, {
        method: 'PUT',
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
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="telephone">Phone</label>
      <input type="tel" name="telephone" id="telephone" />
      <button type="submit">Invite Attendee</button>
    </form>
  );
};

export default NewAttendee;
