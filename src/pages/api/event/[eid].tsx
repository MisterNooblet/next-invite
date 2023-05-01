import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../utils/connectDB';
import Event from '../models/event';
connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { eid } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        const event = await Event.findById(eid);
        res.status(200).json(event);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    case 'PUT':
      try {
        const event = await Event.findByIdAndUpdate(eid, req.body, {
          new: true,
          runValidators: true,
        });
        res.status(201).json(event);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    case 'DELETE':
      try {
        const event = await Event.findByIdAndDelete(eid);
        res.status(201).json(event);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not supported' });
      break;
  }
}
