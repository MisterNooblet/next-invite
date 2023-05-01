import mongoose, { Model, Schema, model } from 'mongoose';

export interface IEvent {
  name: string;
  description: string;
  date: Date;
  location: string;
  attendees: Schema.Types.ObjectId[];
}

type EventModel = Model<IEvent>;

const eventSchema = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'Attendee' }],
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export default model<IEvent, EventModel>('Event', eventSchema);
