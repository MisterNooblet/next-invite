import type { NextApiRequest, NextApiResponse } from 'next';
import db from './utils/connectMySql';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case 'GET':
      let response;
      try {
        const q = 'SELECT * FROM events';
        const [response] = await (await db).query(q);
        res.status(200).json(response);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    case 'POST':
      try {
        const { name, description, date, location } = req.body;
        const q = `INSERT INTO events (name, description, date, location, uniqueId) VALUES (?)`;
        const values = [name, description, date, location, Math.random().toString().split('.')[1]];
        const [response] = await (await db).query(q, [values]);
        res.status(200).json(response);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not supported' });
      break;
  }
}
