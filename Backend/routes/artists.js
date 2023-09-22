const express = require('express');
const router = express.Router();

// Import your artist controller here
const artistController = require('../controllers/artistController');

// Define routes for artists
router.get('/', artistController.getAllArtists);
router.get('/:id', artistController.getArtistById);
router.post('/', artistController.createArtist);
router.put('/:id', artistController.updateArtist);
router.delete('/:id', artistController.deleteArtist);

module.exports = router;