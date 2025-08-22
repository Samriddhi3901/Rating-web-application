const { Store, Rating } = require('../models');
const { Op } = require('sequelize');

exports.listStores = async (req, res) => {
  const { name, address, sortBy = 'name', order = 'ASC' } = req.query;
  const where = {};
  if (name) where.name = { [Op.like]: `%${name}%` };
  if (address) where.address = { [Op.like]: `%${address}%` };

  try {
    const stores = await Store.findAll({
      where,
      order: [[sortBy, order]],
      attributes: ['id', 'name', 'address'],
    });
    const storesWithDetails = await Promise.all(stores.map(async (store) => {
      const ratings = await Rating.findAll({ where: { storeId: store.id } });
      const avgRating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length : 0;
      const userRating = await Rating.findOne({ where: { storeId: store.id, userId: req.user.id } });
      return { ...store.toJSON(), overallRating: avgRating, userRating: userRating ? userRating.rating : null };
    }));
    res.json(storesWithDetails);
  } catch (err) {
    res.status(500).json({ message: 'Error listing stores' });
  }
};

exports.submitRating = async (req, res) => {
  const { storeId, rating } = req.body;
  try {
    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ message: 'Store not found' });
    await Rating.upsert({ userId: req.user.id, storeId, rating });
    res.json({ message: 'Rating submitted/updated' });
  } catch (err) {
    res.status(400).json({ message: 'Error submitting rating', error: err.errors });
  }
};