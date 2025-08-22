const { Store, Rating, User } = require('../models');

exports.dashboard = async (req, res) => {
  try {
    const store = await Store.findOne({ where: { ownerId: req.user.id } });
    if (!store) return res.status(404).json({ message: 'No store found' });
    const ratings = await Rating.findAll({
      where: { storeId: store.id },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });
    const avgRating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length : 0;
    res.json({ averageRating: avgRating, raters: ratings.map(r => ({ user: r.User, rating: r.rating })) });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dashboard' });
  }
};