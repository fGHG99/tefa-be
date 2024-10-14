const express = require('express');
const userModel = require('../models/UserModel');
const { protect } = require('../middlewares/Middleware');
const { success, error } = require('../../utils/Res');
const router = express.Router();

router.get("/profile", protect, async (req, res) => {
    try {
      const data = await userModel.isExist(req.user.id); // Similar to your provided endpoint
      return success(res, "Profile fetched successfully!", data);
    } catch (err) {
      return error(res, err.message);
    }
  });

module.exports = router;