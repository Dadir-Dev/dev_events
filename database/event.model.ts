import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Interface representing the core Event properties.
 */
export interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Interface representing the Event document stored in MongoDB.
 */
export interface IEventDocument extends IEvent, Document {}

/**
 * Helper to generate a URL-friendly slug.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')     // Remove non-word characters except spaces and hyphens
    .replace(/[\s_-]+/g, '-')     // Replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, '');     // Trim leading and trailing hyphens
}

/**
 * Helper to validate and normalize time to HH:MM (24-hour) format.
 * Supports formats like: "14:30", "2:30 PM", "9:15 AM", "09:15".
 */
export function normalizeTime(timeStr: string): string {
  const trimmed = timeStr.trim().toUpperCase();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/);

  if (!match) {
    throw new Error(`Invalid time format: "${timeStr}". Expected HH:MM or HH:MM AM/PM.`);
  }

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = match[3];

  if (hours < 0 || minutes < 0 || minutes > 59) {
    throw new Error(`Invalid time range: "${timeStr}". Minutes must be between 00 and 59.`);
  }

  if (ampm) {
    if (hours < 1 || hours > 12) {
      throw new Error(`Invalid hour for 12-hour format: "${timeStr}". Hour must be between 1 and 12.`);
    }
    if (ampm === 'PM' && hours !== 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }
  } else {
    if (hours < 0 || hours > 23) {
      throw new Error(`Invalid hour for 24-hour format: "${timeStr}". Hour must be between 0 and 23.`);
    }
  }

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

const eventSchema = new Schema<IEventDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true,
      validate: {
        validator: (v: string) => v.trim().length > 0,
        message: 'Title cannot be empty.',
      },
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true,
      validate: {
        validator: (v: string) => v.trim().length > 0,
        message: 'Description cannot be empty.',
      },
    },
    overview: {
      type: String,
      required: [true, 'Overview is required.'],
      trim: true,
      validate: {
        validator: (v: string) => v.trim().length > 0,
        message: 'Overview cannot be empty.',
      },
    },
    image: {
      type: String,
      required: [true, 'Image is required.'],
      trim: true,
      validate: {
        validator: (v: string) => v.trim().length > 0,
        message: 'Image cannot be empty.',
      },
    },
    venue: {
      type: String,
      required: [true, 'Venue is required.'],
      trim: true,
      validate: {
        validator: (v: string) => v.trim().length > 0,
        message: 'Venue cannot be empty.',
      },
    },
    location: {
      type: String,
      required: [true, 'Location is required.'],
      trim: true,
      validate: {
        validator: (v: string) => v.trim().length > 0,
        message: 'Location cannot be empty.',
      },
    },
    date: {
      type: String,
      required: [true, 'Date is required.'],
      trim: true,
      validate: {
        validator: (v: string) => v.trim().length > 0,
        message: 'Date cannot be empty.',
      },
    },
    time: {
      type: String,
      required: [true, 'Time is required.'],
      trim: true,
      validate: {
        validator: (v: string) => v.trim().length > 0,
        message: 'Time cannot be empty.',
      },
    },
    mode: {
      type: String,
      required: [true, 'Mode is required.'],
      trim: true,
      enum: {
        values: ['online', 'offline', 'hybrid'],
        message: '{VALUE} is not a valid mode (must be: online, offline, hybrid).',
      },
      validate: {
        validator: (v: string) => v.trim().length > 0,
        message: 'Mode cannot be empty.',
      },
    },
    audience: {
      type: String,
      required: [true, 'Audience is required.'],
      trim: true,
      validate: {
        validator: (v: string) => v.trim().length > 0,
        message: 'Audience cannot be empty.',
      },
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required.'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0 && v.every(item => item.trim().length > 0),
        message: 'Agenda must contain at least one non-empty item.',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required.'],
      trim: true,
      validate: {
        validator: (v: string) => v.trim().length > 0,
        message: 'Organizer cannot be empty.',
      },
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required.'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0 && v.every(item => item.trim().length > 0),
        message: 'Tags must contain at least one non-empty tag.',
      },
    },
  },
  {
    timestamps: true, // Enables createdAt and updatedAt automatic timestamps
  }
);

// Pre-save hook: auto-generates slug, normalizes date and time
eventSchema.pre('save', function (this: IEventDocument) {
  // 1. Slug generation from title
  if (this.isModified('title') || !this.slug) {
    this.slug = generateSlug(this.title);
  }

  // 2. Date validation and ISO format normalization
  if (this.isModified('date')) {
    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error(`Invalid date format for: "${this.date}".`);
    }
    this.date = parsedDate.toISOString();
  }

  // 3. Time validation and HH:MM normalization
  if (this.isModified('time')) {
    try {
      this.time = normalizeTime(this.time);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred during time normalization.');
    }
  }
});

// Cache compilation to prevent OverwriteModelError in Next.js development mode
const Event = (mongoose.models.Event as Model<IEventDocument>) || mongoose.model<IEventDocument>('Event', eventSchema);

export default Event;
