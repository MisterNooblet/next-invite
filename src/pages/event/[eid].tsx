import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import NewAttendee from '../components/NewAttendee';
import { IAttendee } from '../api/models/attendee';
import formatDate from '../api/utils/formatDate';

export interface AttendeeExtended extends IAttendee {
  id: string;
}
interface EventExtended {
  id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  attendees: AttendeeExtended[];
}
const Event = () => {
  const [event, setEvent] = useState<EventExtended | null>(null);
  const router = useRouter();
  const { eid } = router.query;

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get<EventExtended>(`/api/event/${eid}`);
        console.log(response);
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
      <div>{event && formatDate(event?.date.toString())}</div>
      <div>{event?.location}</div>
      <NewAttendee />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Telephone</th>
            <th>Coming</th>
            <th>Extra Guests</th>
          </tr>
        </thead>
        <tbody>
          {/* {event?.attendees.map((attendee) => (
            <tr key={attendee.id}>
              <td>{attendee.name}</td>
              <td>{attendee.telephone}</td>
              <td>{attendee.isComing ? 'Yes' : 'No'}</td>
              <td>{attendee.extraGuests}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </>
  );
};

export default Event;
