import type { NextApiRequest, NextApiResponse } from 'next';
import sendSMS from '../utils/sendSMS';
import dtgreeter from 'dtgreeter';
import formatDate from '../utils/formatDate';
import db from '../utils/connectMySql';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { eid } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const q = `SELECT * FROM events where id = ${eid}`;
        let [event] = await (await db).query(q);
        const q2 = `SELECT 
  events.id, 
  events.name, 
  events.description, 
  events.date, 
  events.location,
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'id', attendee.id,
      'name', attendee.name,
      'telephone', attendee.telephone,
      'isComing', attendee.isComing,
      'extraGuests', attendee.extraGuests
    )
  ) AS attendees
FROM 
  events 
  JOIN attendee ON events.uniqueId = attendee.eventId 
WHERE 
  events.id = ${eid}
GROUP BY 
  events.id, 
  events.name, 
  events.description, 
  events.date, 
  events.location
`;
        let [fullEvent] = await (await db).query(q2);
        if (fullEvent.length > 0) {
          res.status(200).json(fullEvent[0]);
        } else {
          event[0].attendees = [];
          res.status(200).json(event[0]);
        }
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    case 'PUT':
      try {
        const q = `SELECT * FROM events where id = ${eid}`;
        let [event] = await (await db).query(q);
        if (req.body.attendee) {
          const { name, telephone } = req.body.attendee;
          const q = `INSERT INTO attendee (name, telephone, isComing, extraGuests, eventId) VALUES (?)`;
          const values = [name, telephone, 0, 0, event[0].uniqueId];
          const [response] = await (await db).query(q, [values]);
          if (response.warningStatus === 0) {
            await sendSMS(
              telephone,
              dtgreeter(name),
              event[0].name,
              formatDate(event[0].date.toString()),
              event[0].location,
              `https://next-invite-bay.vercel.app/attendee/${response.insertId}`
            );

            console.log(response);
          }
        }
        res.status(201).json(event);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    case 'DELETE':
      // try {
      //   const event = await Event.findByIdAndDelete(eid);
      //   res.status(201).json(event);
      // } catch (err) {
      //   res.status(500).json({ error: err });
      // }
      break;
    default:
      res.status(405).json({ error: 'Method not supported' });
      break;
  }
}
