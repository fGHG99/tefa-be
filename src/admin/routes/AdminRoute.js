const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middlewares/Middleware'); // Adjusted path for middleware
const adminController = require('../controllers/AdminController');
const feeController = require('../controllers/FeeController'); // Updated import for consistency

// Apply `protect` and `authorizeRoles` middleware directly in the route definitions

// Route to get Admin profile
// router.get("/profile", protect, async (req, res) => {
//     try {
//       const user = await userModel.isExist(req.user.id);
  
//       const profileData = {
//         name: user.name,
//         email: user.email,
//         class: user.class, 
//         role: user.role,
//       };
  
//       return success(res, "Profile fetched successfully!", profileData);
//     } catch (err) {
//       return error(res, err.message);
//     }
//   });
  
  //edit profile
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

// Routes for managing users
router.post('/create', protect, authorizeRoles('ADMIN'), adminController.createUser);
router.get('/users', protect, authorizeRoles('ADMIN'), adminController.getAllUsers);
router.put('/update/:id', protect, authorizeRoles('ADMIN'), adminController.updateUser);
router.delete('/delete/:id', protect, authorizeRoles('ADMIN'), adminController.deleteUser);

// Routes for managing admin fees
router.get('/get-fee', protect, authorizeRoles('ADMIN'), feeController.getAdminFee);
router.put('/update-fee', protect, authorizeRoles('ADMIN'), feeController.updateAdminFee);
router.post('/create-fee', protect, authorizeRoles('ADMIN'), feeController.setAdminFee);

module.exports = router;
