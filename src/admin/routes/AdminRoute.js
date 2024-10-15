const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middlewares/Middleware');
const profile = require('../controllers/UserController'); 
const adminController = require('../controllers/AdminController');
const { getAdminFee, updateAdminFee, setAdminFee } = require('../../admin/controllers/FeeController');

// Route to get Admin profile
router.get('/profile', protect, authorizeRoles('ADMIN'), profile.getAdminProfile);
router.post('/create', protect, authorizeRoles('ADMIN'), adminController.createUser);
router.get('/users', protect, authorizeRoles('ADMIN'), adminController.getAllUsers);
router.put('/update/:id', protect, authorizeRoles('ADMIN'), adminController.updateUser);
router.delete('/delete/:id', protect, authorizeRoles('ADMIN'), adminController.deleteUser);
router.get('/get-fee', protect, authorizeRoles('ADMIN'), getAdminFee);
router.put('/update-fee', protect, authorizeRoles('ADMIN'), updateAdminFee);
router.post('/create-fee', protect, authorizeRoles('ADMIN'), setAdminFee);

module.exports = router;



module.exports = router;
