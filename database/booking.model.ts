import mongoose, { Schema, Document, Model, Types } from 'mongoose';

/**
 * Interface representing the core Booking properties.
 */
export interface IBooking {
  eventId: Types.ObjectId;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Interface representing the Booking document stored in MongoDB.
 */
export interface IBookingDocument extends IBooking, Document {}

const bookingSchema = new Schema<IBookingDocument>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'eventId is required.'],
      index: true, // Index added on eventId for faster queries as requested
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      // Built-in path validation for email format
      validate: {
        validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: 'Invalid email format.',
      },
    },
  },
  {
    timestamps: true, // Enables automatic timestamps (createdAt, updatedAt)
  }
);

// Pre-save hook: validate email and check if referenced Event exists
bookingSchema.pre('save', async function (this: IBookingDocument) {
  // 1. Redundant pre-save validation for email format ensuring robust safety
  if (this.isModified('email')) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new Error(`Invalid email format: "${this.email}".`);
    }
  }

  // 2. Reference validation: check if the referenced eventId exists in the Event collection
  if (this.isModified('eventId')) {
    // Look up Event model dynamically to avoid potential circular dependency issues
    const EventModel = mongoose.models.Event || mongoose.model('Event');
    const eventExists = await EventModel.exists({ _id: this.eventId });
    if (!eventExists) {
      throw new Error(`Referenced Event with ID "${this.eventId}" does not exist.`);
    }
  }
});

// Cache compilation to prevent OverwriteModelError in Next.js development mode
const Booking = (mongoose.models.Booking as Model<IBookingDocument>) || mongoose.model<IBookingDocument>('Booking', bookingSchema);

export default Booking;
