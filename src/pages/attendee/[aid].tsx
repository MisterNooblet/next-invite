import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import NewAttendee from '../components/NewAttendee';
import { IAttendee } from '../api/models/attendee';
const Event = () => {
  const [attendee, setAttendee] = useState<IAttendee | null>(null);
  const router = useRouter();
  const { aid } = router.query;

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get<IAttendee>(`/api/attendee/${aid}`);
        console.log(response.data);
        setAttendee(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getEvent();
  }, [aid]);

  return (
    <>
      <h1>{attendee?.name}</h1>
      <div>{attendee?.telephone}</div>
      <div>{attendee?.isComing}</div>
      <div>{attendee?.extraGuests}</div>
    </>
  );
};

export default Event;
