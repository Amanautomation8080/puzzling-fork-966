const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfRelease: Date,
  cover: String,
  artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;