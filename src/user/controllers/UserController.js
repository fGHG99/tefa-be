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


module.exports = router;