import mongoose from 'mongoose';

const BuildSchema = new mongoose.Schema(
  {
    championId: { type: String, required: true, index: true },
    role: {
      type: String,
      required: true,
      enum: ['top', 'jungle', 'mid', 'adc', 'support'],
    },
    elo: {
      type: String,
      required: true,
      enum: [
        'iron','bronze','silver','gold','platinum','emerald','diamond',
        'master','grandmaster','challenger'
      ],
    },
    patch: { type: String, required: true },

    runes: {
      primary: String,
      secondary: String,
      perks: { type: [String], default: [] },
    },
    skills: { type: [String], default: [] },
    startingItems: { type: [String], default: [] },
    coreItems: { type: [String], default: [] },
    situationalItems: { type: [String], default: [] },
    boots: { type: String },
    summoners: { type: [String], default: [] },

    notes: { type: String },
    upvotes: { type: Number, default: 0 },
    authorId: { type: String },
  },
  { timestamps: true }
);

// Índice único por championId+role+elo+patch
BuildSchema.index(
  { championId: 1, role: 1, elo: 1, patch: 1 },
  { unique: true }
);

export const Build = mongoose.model('Build', BuildSchema);
