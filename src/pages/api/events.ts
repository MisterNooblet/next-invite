// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2';
import db from './utils/connectMySql';
// import connectDB from './utils/connectDB';
// import Event from './models/event';
// connectDB();

// export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
//   switch (req.method) {
//     case 'GET':
//       try {
//         const events = await Event.find({});
//         res.status(200).json(events);
//       } catch (err) {
//         res.status(500).json({ error: err });
//       }
//       break;
//     case 'POST':
//       try {
//         const event = await Event.create(req.body);
//         res.status(201).json(event);
//       } catch (err) {
//         res.status(500).json({ error: err });
//       }
//       break;
//     default:
//       res.status(405).json({ error: 'Method not supported' });
//       break;
//   }
// }

//mySQL

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case 'GET':
      try {
        const q = 'SELECT * FROM events';
        db.query(q, (err, result) => {
          if (err) throw err;
          res.status(200).json(result);
        });
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    case 'POST':
      try {
        const { name, description, date, location } = req.body;
        const q = `INSERT INTO events (name, description, date, location, uniqueId) VALUES (?)`;
        const values = [name, description, date, location, Math.random().toString().split('.')[1]];
        db.query(q, [values], (err, result) => {
          if (err) throw err;
          res.status(201).json(result);
        });
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not supported' });
      break;
  }
}
