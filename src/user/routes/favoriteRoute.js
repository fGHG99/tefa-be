const express = require('express');
const { addFavorite, getFavorites, removeFavorite, isFavorited } = require('../controllers/favoriteController');
const router = express.Router();

// Route to add a favorite
router.post('/add', (req, res) => {
  const { id, tokoId } = req.body; // Expecting 'id' as userId
  addFavorite(id, tokoId)
    .then(favorite => res.json(favorite))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route to get all favorites for a user
router.get('/:id', (req, res) => {
  const { id } = req.params; // Expecting 'id' as userId
  getFavorites(id)
    .then(favorites => res.json(favorites))
    .catch(err => res.status(500).json({ error: err.message }));
});

//Router to remove a favorite
router.post('/remove', (req, res) => {
    const { id, tokoId } = req.body; // User's id and tokoId passed in the request body
    removeFavorite(id, tokoId)
      .then(() => res.json({ success: true }))  // Respond with success
      .catch(err => res.status(500).json({ error: err.message }));
  });

// Route to check if a store is favorited
router.get('/isFavorited/:id/:tokoId', (req, res) => {
  const { id, tokoId } = req.params; // Expecting 'id' as userId
  isFavorited(id, tokoId)
    .then(isFav => res.json({ isFavorited: isFav }))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
