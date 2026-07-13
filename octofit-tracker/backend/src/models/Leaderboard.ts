import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 }
  },
  {
    _id: false,
    versionKey: false
  }
);

const leaderboardSchema = new Schema(
  {
    period: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      required: true
    },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
    entries: { type: [leaderboardEntrySchema], default: [] }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

export const Leaderboard = model('Leaderboard', leaderboardSchema);
