const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
  ratingValue: { type: Number, min: 1, max: 5, required: true },
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;