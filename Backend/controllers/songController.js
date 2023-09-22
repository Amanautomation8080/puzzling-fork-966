const { validationResult, body } = require('express-validator');
const Song = require('../models/Song'); // Import your Mongoose model here

// Controller methods for songs
exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getSongById = async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createSong = [
  // Validation middleware using express-validator
  body('name')
    .notEmpty().withMessage('Song name is required')
    .custom(async (value) => {
      // Check if the song name already exists
      const existingSong = await Song.findOne({ name: value });
      if (existingSong) {
        throw new Error('Song name must be unique');
      }
      return true;
    }),
  body('dateOfRelease').isDate().withMessage('Invalid date format'),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new song
    const { name, dateOfRelease, cover } = req.body;
    const newSong = new Song({ name, dateOfRelease, cover });

    try {
      const song = await newSong.save();
      res.status(201).json(song);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
  },
];

exports.updateSong = async (req, res) => {
  const { id } = req.params;
  const { name, dateOfRelease, cover } = req.body;

  try {
    const song = await Song.findByIdAndUpdate(id, { name, dateOfRelease, cover }, { new: true });
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.deleteSong = async (req, res) => {
  const { id } = req.params;

  try {
    const song = await Song.findByIdAndDelete(id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};