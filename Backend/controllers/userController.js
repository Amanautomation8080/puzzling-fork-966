const { validationResult, body } = require('express-validator');
const User = require('./models/User'); // Import your Mongoose model here

// Controller methods for users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createUser = [
  // Validation middleware using express-validator
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Invalid email format')
    .custom(async (value) => {
      // Check if the email already exists
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error('Email must be unique');
      }
      return true;
    }),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new user
    const { name, email } = req.body;
    const newUser = new User({ name, email });

    try {
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
  },
];

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};