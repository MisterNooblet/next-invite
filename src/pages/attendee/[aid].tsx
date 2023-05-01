import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import dtgreeter from 'dtgreeter';

interface AttendeeExtended {
  id: string;
  name: string;
  telephone: string;
  isComing: boolean;
  extraGuests: number;
  eventId: {
    id: string;
    name: string;
    description: string;
    date: Date;
    location: string;
  };
}

const Event = () => {
  const [attendee, setAttendee] = useState<AttendeeExtended | null>(null);
  const router = useRouter();
  const { aid } = router.query;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { isComing, extraGuests } = event.currentTarget;
    const body = {
      // @ts-ignore
      isComing: isComing.checked,
      extraGuests: extraGuests.value,
    };
    try {
      const response = await fetch(`/api/attendee/${aid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      //   router.reload();
    } catch (error) {}
  };

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get<AttendeeExtended>(`/api/attendee/${aid}`);
        setAttendee(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getEvent();
  }, [aid]);

  return (
    <>
      <h1>{dtgreeter(attendee?.name)}</h1>
      <h3>
        Are you comming to {attendee?.eventId.name} at {attendee?.eventId.location}?
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="isComing">Yes</label>
        <input
          type="checkbox"
          name="isComing"
          id="isComing"
          checked={attendee?.isComing}
          onChange={() => {
            if (attendee) {
              setAttendee({ ...attendee, isComing: !attendee?.isComing });
            }
          }}
        />
        <label htmlFor="extraGuests">Extra Guests</label>
        <input
          type="number"
          name="extraGuests"
          id="extraGuests"
          value={attendee?.extraGuests}
          onChange={(e) => {
            if (attendee) {
              setAttendee({ ...attendee, extraGuests: e.target.valueAsNumber });
            }
          }}
        />
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default Event;
