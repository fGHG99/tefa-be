const express = require('express');
const userModel = require('../models/userModel');
const { protect } = require('../middlewares/middleware');
const { success, error } = require('../../utils/res');
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