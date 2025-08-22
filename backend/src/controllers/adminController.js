const { User, Store, Rating } = require('../models');
const { Op } = require('sequelize');

exports.addUser = async (req, res) => {
  const { name, email, address, password, role } = req.body;
  try {
    const user = await User.create({ name, email, address, password, role });
    res.status(201).json({ message: 'User added', userId: user.id });
  } catch (err) {
    res.status(400).json({ message: 'Error adding user', error: err.errors });
  }
};

exports.addStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;
  try {
    const owner = await User.findByPk(ownerId);
    if (!owner || owner.role !== 'store_owner') {
      return res.status(400).json({ message: 'Invalid owner' });
    }
    const store = await Store.create({ name, email, address, ownerId });
    res.status(201).json({ message: 'Store added', storeId: store.id });
  } catch (err) {
    res.status(400).json({ message: 'Error adding store', error: err.errors });
  }
};

exports.dashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dashboard' });
  }
};

exports.listStores = async (req, res) => {
  const { name, email, address, sortBy = 'name', order = 'ASC' } = req.query;
  const where = {};
  if (name) where.name = { [Op.like]: `%${name}%` };
  if (email) where.email = { [Op.like]: `%${email}%` };
  if (address) where.address = { [Op.like]: `%${address}%` };

  try {
    const stores = await Store.findAll({
      where,
      order: [[sortBy, order]],
      attributes: ['id', 'name', 'email', 'address'],
      include: [{
        model: Rating,
        attributes: [],
        required: false,
      }],
    });
    const storesWithRating = await Promise.all(stores.map(async (store) => {
      const ratings = await Rating.findAll({ where: { storeId: store.id } });
      const avgRating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length : 0;
      return { ...store.toJSON(), rating: avgRating };
    }));
    res.json(storesWithRating);
  } catch (err) {
    res.status(500).json({ message: 'Error listing stores' });
  }
};

exports.listUsers = async (req, res) => {
  const { name, email, address, role, sortBy = 'name', order = 'ASC' } = req.query;
  const where = { role: { [Op.ne]: 'store_owner' } }; // Normal and admin
  if (name) where.name = { [Op.like]: `%${name}%` };
  if (email) where.email = { [Op.like]: `%${email}%` };
  if (address) where.address = { [Op.like]: `%${address}%` };
  if (role) where.role = role;

  try {
    const users = await User.findAll({
      where,
      order: [[sortBy, order]],
      attributes: ['id', 'name', 'email', 'address', 'role'],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error listing users' });
  }
};

exports.viewUserDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, { attributes: ['id', 'name', 'email', 'address', 'role'] });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'store_owner') {
      const store = await Store.findOne({ where: { ownerId: user.id } });
      if (store) {
        const ratings = await Rating.findAll({ where: { storeId: store.id } });
        const avgRating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length : 0;
        return res.json({ ...user.toJSON(), rating: avgRating });
      }
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error viewing user' });
  }
};