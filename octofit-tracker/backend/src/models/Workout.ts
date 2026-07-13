import { Schema, model, type InferSchemaType } from 'mongoose';

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sets: { type: Number, required: true, min: 1 },
    reps: { type: Number, required: true, min: 1 }
  },
  {
    _id: false,
    versionKey: false
  }
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [exerciseSchema], default: [] },
    recommendedForUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

export const Workout = model('Workout', workoutSchema);
