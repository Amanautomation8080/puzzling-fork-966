const express = require('express');
const router = express.Router();

// Import your song controller here
const songController = require('../controllers/songController');

// Define routes for songs
router.get('/', songController.getAllSongs);
router.get('/:id', songController.getSongById);
router.post('/', songController.createSong);
router.put('/:id', songController.updateSong);
router.delete('/:id', songController.deleteSong);

module.exports = router;