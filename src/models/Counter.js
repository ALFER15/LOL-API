import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema(
  {
    championId: { type: String, required: true, index: true },
    vsChampionId: { type: String, required: true, index: true },
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

    winRate: { type: Number, min: 0, max: 1, required: true },
    sampleSize: { type: Number, min: 0, default: 0 },

    tipsFor: { type: [String], default: [] },
    tipsAgainst: { type: [String], default: [] },
  },
  { timestamps: true }
);

CounterSchema.index({
  championId: 1,
  vsChampionId: 1,
  role: 1,
  elo: 1,
  patch: 1
});

export const Counter = mongoose.model('Counter', CounterSchema);
