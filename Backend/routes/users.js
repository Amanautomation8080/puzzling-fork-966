const express = require('express');
const router = express.Router();

// Import your user controller here
const userController = require('../controllers/userController');

// Define routes for users
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;