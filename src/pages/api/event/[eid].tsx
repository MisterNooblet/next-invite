import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { eid } = req.query;
  res.status(200).json({ name: eid });
  console.log(eid);
}
