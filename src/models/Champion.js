import mongoose from 'mongoose';

const ChampionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true }, // slug: 'kaisa'
    name: { type: String, required: true },
    roles: {
      type: [String],
      enum: ['top', 'jungle', 'mid', 'adc', 'support'],
      default: [],
    },
    aliases: { type: [String], default: [] },
    releasedAt: { type: Date },
  },
  { timestamps: true }
);

export const Champion = mongoose.model('Champion', ChampionSchema);
