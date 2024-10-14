const express = require('express');
const userModel = require('../models/aUserModel');
const { protect } = require('../middlewares/aMiddleware');
const { success, error } = require('../../utils/aRes');
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