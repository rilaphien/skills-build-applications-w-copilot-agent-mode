import { Schema, model, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, default: 0, min: 0 }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

export const Team = model('Team', teamSchema);
