const { validationResult, body } = require('express-validator');
const Rating = require('./models/Rating'); // Import your Mongoose model here

// Controller methods for ratings
exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getRatingById = async (req, res) => {
  const { id } = req.params;
  try {
    const rating = await Rating.findById(id);
    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }
    res.json(rating);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createRating = [
  // Validation middleware using express-validator
  body('userId').notEmpty().withMessage('User ID is required'),
  body('songId').notEmpty().withMessage('Song ID is required'),
  body('ratingValue')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new rating
    const { userId, songId, ratingValue } = req.body;
    const newRating = new Rating({ userId, songId, ratingValue });

    try {
      const rating = await newRating.save();
      res.status(201).json(rating);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
  },
];

exports.updateRating = async (req, res) => {
  const { id } = req.params;
  const { ratingValue } = req.body;

  try {
    const rating = await Rating.findByIdAndUpdate(id, { ratingValue }, { new: true });
    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }
    res.json(rating);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.deleteRating = async (req, res) => {
  const { id } = req.params;

  try {
    const rating = await Rating.findByIdAndDelete(id);
    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};