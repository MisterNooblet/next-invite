import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { EventResponse } from '..';
import axios from 'axios';
const Event = () => {
  const [event, setEvent] = useState<EventResponse | null>(null);
  const router = useRouter();
  const { eid } = router.query;

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get<EventResponse>(`/api/event/${eid}`);
        setEvent(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getEvent();
  }, [eid]);

  return (
    <>
      <h1>{event?.name}</h1>
      <div>{event?.description}</div>
      <div>{event?.date.toString()}</div>
      <div>{event?.location}</div>
    </>
  );
};

export default Event;
