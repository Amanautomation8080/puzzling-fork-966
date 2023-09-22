

const { validationResult, body } = require('express-validator');
const Artist = require('./models/Artist'); // Import your Mongoose model here

// Controller methods for artists
exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getArtistById = async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createArtist = [
  // Validation middleware using express-validator
  body('name')
    .notEmpty().withMessage('Artist name is required')
    .custom(async (value) => {
      // Check if the artist name already exists
      const existingArtist = await Artist.findOne({ name: value });
      if (existingArtist) {
        throw new Error('Artist name must be unique');
      }
      return true;
    }),
  body('dob').isDate().withMessage('Invalid date format'),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new artist
    const { name, dob, bio } = req.body;
    const newArtist = new Artist({ name, dob, bio });

    try {
      const artist = await newArtist.save();
      res.status(201).json(artist);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
  },
];

exports.updateArtist = async (req, res) => {
  const { id } = req.params;
  const { name, dob, bio } = req.body;

  try {
    const artist = await Artist.findByIdAndUpdate(id, { name, dob, bio }, { new: true });
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json(artist);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.deleteArtist = async (req, res) => {
  const { id } = req.params;

  try {
    const artist = await Artist.findByIdAndDelete(id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json({ message: 'Artist deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};