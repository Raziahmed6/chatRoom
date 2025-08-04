const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: '' },
    gender: { type: String, default: '' },
    profileImage: {
      type: String,
      default: 'http://localhost:5173/default-avatar.png',
    },
  },
  { timestamps: true }
);

// ✅ Export model only once (prevents overwrite issue in dev)
module.exports = models.User || model('User', userSchema);
