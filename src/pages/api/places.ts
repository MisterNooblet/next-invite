import { Client } from '@googlemaps/google-maps-services-js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const client = new Client({});
  switch (req.method) {
    case 'POST':
      const input = req.body.address;

      const response = await client.placeAutocomplete({
        params: {
          input: input,
          key: process.env.GOOGLE_API || '',
        },
        timeout: 1000, // milliseconds
      });
      const predictions = response.data.predictions.map((prediction: { description: any; place_id: any }) => {
        return {
          description: prediction.description,
          place_id: prediction.place_id,
        };
      });
      res.send(predictions);
      break;
    default:
      res.status(405).json({ error: 'Method not supported' });
      break;
  }
}
