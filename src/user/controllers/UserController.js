const express = require('express');
const userModel = require('../models/UserModel');
const { protect } = require('../middlewares/Middleware');
const { success, error } = require('../../utils/Res');
const router = express.Router();

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await userModel.isExist(req.user.id);

    const profileData = {
      name: user.name,
      email: user.email,
      class: user.class, 
      role: user.role,
    };

    return success(res, "Profile fetched successfully!", profileData);
  } catch (err) {
    return error(res, err.message);
  }
});

router.put("/profile", protect, async (req, res) => {
  const { name, class: userClass } = req.body; // Destructuring the name and class from the request body

  try {
    // Fetch the user based on their ID from the JWT (req.user.id)
    const user = await userModel.isExist(req.user.id);

    if (!user) {
      return error(res, "User not found");
    }

    const updatedUser = await userModel.updateUser(req.user.id, {
      name: name || user.name, // Keep the original value if not provided
      class: userClass || user.class, // Keep the original value if not provided
    });

    const profileData = {
      name: updatedUser.name,
      email: updatedUser.email,
      class: updatedUser.class,
      role: updatedUser.role,
    };

    return success(res, "Profile updated successfully!", profileData);
  } catch (err) {
    return error(res, err.message);
  }
});


module.exports = router;