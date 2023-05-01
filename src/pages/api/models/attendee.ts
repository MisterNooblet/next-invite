import mongoose, { Model, Schema, model } from 'mongoose';

export interface IAttendee {
  name: string;
  telephone: string;
  isComing: boolean;
  extraGuests: number;
}

type AttendeeModel = Model<IAttendee>;

const eventSchema = new Schema<IAttendee>(
  {
    name: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    isComing: {
      type: Boolean,
      required: true,
      default: false,
    },
    extraGuests: {
      type: Number,
      required: true,
      default: 0,
    },
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

export default model<IAttendee, AttendeeModel>('Attendee', eventSchema);