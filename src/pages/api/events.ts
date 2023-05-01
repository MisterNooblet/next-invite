// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from './utils/connectDB';
import Event from './models/event';
connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case 'GET':
      try {
        const events = await Event.find({});
        res.status(200).json(events);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    case 'POST':
      try {
        const event = await Event.create(req.body);
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
