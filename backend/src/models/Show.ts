import mongoose, { Document, Schema } from "mongoose";

export interface IShow extends Document {
  movie: mongoose.Types.ObjectId;
  showTime: Date;
  totalSeats: number;
  bookedSeats: number[];
  lockedSeats: {
    seatNumber: number;
    user: mongoose.Types.ObjectId | undefined;
    lockUntil: Date;
}[];
}

const showSchema = new Schema<IShow>({
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  showTime: {
    type: Date,
    required: true,
  },
  totalSeats: {
    type: Number,
    default: 50,
  },
  bookedSeats: [
    {
      type: Number,
    },
  ],
  lockedSeats: [
  {
    seatNumber: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lockUntil: Date,
  },
],
});

const Show = mongoose.model<IShow>("Show", showSchema);

export default Show;