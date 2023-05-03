import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../utils/connectMySql';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { aid } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        const q = `SELECT * FROM attendee where id = ${aid}`;
        let [attendee] = await (await db).query(q);
        //@ts-ignore
        attendee = attendee[0];
        //@ts-ignore
        const q2 = `SELECT * FROM events where uniqueId = ${attendee.eventId}`;
        let [event] = await (await db).query(q2);
        //@ts-ignore
        attendee.event = event[0];
        console.log(attendee);
        res.status(200).json(attendee);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    case 'PUT':
      try {
        const q = `UPDATE attendee SET isComing = ${req.body.isComing}, extraGuests = ${req.body.extraGuests} WHERE id = ${aid}`;
        let [attendee] = await (await db).query(q);
        //@ts-ignore
        res.status(201).json(attendee[0]);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not supported' });
      break;
  }
}
