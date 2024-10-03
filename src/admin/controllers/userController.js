const express = require('express');
const userModel = require('../models/userModel');
const { success, error } = require('../../utils/res');
const { protect } = require('../middlewares/middleware')
const router = express.Router();

router.post("/admin-login", async (req, res) => {
    try {
      const data = await userModel.logIn(req.body);
      return success(res, "Login Succesfull", data);
    } catch (err) {
      return error(res, err.message);
    }
  });

router.get("/admin-auth", protect , async (req, res) => {
    try {
      const data = await userModel.isExist(req.user.id);
      req.app.locals.userId = req.user.id;
      return success(res, "Autentikasi berhasil!", data);
    } catch (err) {
      return error(res, err.message);
    }
  });

  module.exports = router;
  