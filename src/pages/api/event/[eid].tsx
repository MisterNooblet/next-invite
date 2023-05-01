import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../utils/connectDB';
import Event from '../models/event';
import Attendee from '../models/attendee';
import sendSMS from '../utils/sendSMS';
import dtgreeter from 'dtgreeter';
import formatDate from '../utils/formatDate';
connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { eid } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        let event = await Event.findById(eid);
        console.log(event);
        if (event && event.attendees.length > 0) {
          event = await Event.findById(eid).populate('attendees');
        }
        res.status(200).json(event);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    case 'PUT':
      try {
        let event;
        if (req.body.attendee) {
          const { name, telephone } = req.body.attendee;
          const attendee = await Attendee.create({ name: name, telephone: telephone, eventId: eid });
          if (attendee) {
            event = await Event.findByIdAndUpdate(
              eid,
              { $push: { attendees: attendee.id } },
              { new: true, runValidators: true }
            );
            if (event) {
              await sendSMS(
                attendee.telephone,
                dtgreeter(attendee.name),
                event.name,
                formatDate(event.date.toString()),
                event.location,
                `url`
              );
            }
          }
        }
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
