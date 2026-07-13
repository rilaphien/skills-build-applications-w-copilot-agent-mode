import { Schema, model, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    type: {
      type: String,
      enum: ['run', 'cycle', 'strength', 'yoga', 'hiit', 'walk'],
      required: true
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    completedAt: { type: Date, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

export const Activity = model('Activity', activitySchema);
