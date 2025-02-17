// In a temporary adminRoutes.js file

//ONLY FOR TESTING PURPOSES
const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// WARNING: This route should be removed or secured in production.
// router.put('/update-role', async (req, res) => {
//   try {
//     const { email, role } = req.body;
//     // Update the user with the given email to have the specified role
//     const user = await User.findOneAndUpdate({ email }, { role }, { new: true });
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json({ message: 'Role updated successfully', user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// GET all users (admin only)
router.get('/users', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// PUT update a user's role (admin only)
router.put('/users/:id/role', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  const { role } = req.body;
  if (!role || !['admin', 'seller', 'buyer'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role provided.' });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// DELETE a user (admin only)
router.delete('/users/:id', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;