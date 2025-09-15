import mongoose from 'mongoose';

const PatchSchema = new mongoose.Schema(
  {
    version: { type: String, required: true, unique: true, index: true }, // '14.18'
    releasedAt: { type: Date },
    notesUrl: { type: String },
  },
  { timestamps: true }
);

export const Patch = mongoose.model('Patch', PatchSchema);
