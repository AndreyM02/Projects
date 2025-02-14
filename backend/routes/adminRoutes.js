// In a temporary adminRoutes.js file

//ONLY FOR TESTING PURPOSES
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// WARNING: This route should be removed or secured in production.
router.put('/update-role', async (req, res) => {
  try {
    const { email, role } = req.body;
    // Update the user with the given email to have the specified role
    const user = await User.findOneAndUpdate({ email }, { role }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Role updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;