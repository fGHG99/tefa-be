const { router } = require('../../utils/Router');
const {
  getAllHistory,
  getHistoryById,
  getHistoryByTokoId,
  getHistoryByMonth,
} = require('../controllers/historyController');
const { protect } = require('../middlewares/Middleware');

// Routes for transaction history
router.get('/history', protect, getAllHistory);                         // Get all history
router.get('/history/:id', protect, getHistoryById);                    // Get history by ID
router.get('/history/toko/:tokoId', protect,  getHistoryByTokoId);       // Get history by Toko ID
router.get('/history/month/:year/:month', protect, getHistoryByMonth);  // Get history by month

module.exports = router;
