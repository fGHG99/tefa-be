const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient

// Add a favorite
const addFavorite = async (id, tokoId) => {
    const favorite = await prisma.favorite.create({
      data: {
        userId: id,  // This is the 'id' field from User model
        tokoId: tokoId,
        favId: tokoId,   // Same as tokoId
      },
    });
    return favorite;
  };
  
  // Retrieve all favorites for a user
  const getFavorites = async (id) => {
    // Convert id to integer if it's a string
    const userId = parseInt(id, 10);
  
    // Check if conversion was successful
    if (isNaN(userId)) {
      throw new Error('Invalid userId');
    }
  
    // Retrieve all favorites for a user
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: userId,  // Use the integer userId
      },
      include: {
        toko: true,  // Include related Toko details
      },
    });
  
    return favorites;
  };
  
  // Remove a favorite
  const removeFavorite = async (id, tokoId) => {
    const favorite = await prisma.favorite.deleteMany({
      where: {
        userId: id,  // Using 'id' as the user identifier
        tokoId: tokoId,
      },
    });
    return favorite;
  };
  
  // Check if a store is favorited by the user
  const isFavorited = async (userId, tokoId) => {
    // Convert userId and tokoId to integers if they are strings
    const user = parseInt(userId, 10);
    const toko = parseInt(tokoId, 10);
  
    // Check if conversions were successful
    if (isNaN(user) || isNaN(toko)) {
      throw new Error('Invalid userId or tokoId');
    }
  
    // Check if the store is favorited by the user
    const favorite = await prisma.favorite.findFirst({
      where: {
        userId: user,
        tokoId: toko
      }
    });
  
    return favorite !== null; // Return true if a favorite is found, otherwise false
  };
  
  // Export functions to use in routes
  module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite,
    isFavorited,
  };
