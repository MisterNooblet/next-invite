import mongoose, { Model, Schema, model } from 'mongoose';

export interface IAttendee {
  name: string;
  telephone: string;
  isComing: boolean;
  extraGuests: number;
}

type AttendeeModel = Model<IAttendee>;

let Attendee = mongoose.models.Attendee as AttendeeModel;

if (!Attendee) {
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
        default: false,
      },
      extraGuests: {
        type: Number,
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

  Attendee = model<IAttendee, AttendeeModel>('Attendee', eventSchema);
}

export default Attendee;
