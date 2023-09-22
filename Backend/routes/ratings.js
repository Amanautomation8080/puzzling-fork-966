const express = require('express');
const router = express.Router();

// Import your rating controller here
const ratingController = require('../controllers/ratingController');

// Define routes for ratings
router.get('/', ratingController.getAllRatings);
router.get('/:id', ratingController.getRatingById);
router.post('/', ratingController.createRating);
router.put('/:id', ratingController.updateRating);
router.delete('/:id', ratingController.deleteRating);

module.exports = router;