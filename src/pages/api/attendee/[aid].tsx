import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../utils/connectDB';
import Event from '../models/event';
import Attendee from '../models/attendee';
connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { aid } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        let attendee = await Attendee.findById(aid).populate('eventId');
        console.log(attendee);

        res.status(200).json(attendee);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    case 'PUT':
      try {
        console.log(req.body);
        const attendee = await Attendee.findByIdAndUpdate(aid, req.body, {
          new: true,
          runValidators: true,
        });
        res.status(201).json(attendee);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not supported' });
      break;
  }
}
