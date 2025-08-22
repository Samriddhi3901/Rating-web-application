const { sequelize, User } = require('./src/models');

(async () => {
  await sequelize.sync({ force: true }); // Drops and recreates tables
  await User.create({
    name: 'SamriddhiAgrawal',
    email: 'Samriddhi@example.com',
    address: '123 Admin',
    password: 'SamriddhiAdmin1!',
    role: 'admin'
  });
  console.log('Admin Samriddhi created');
  process.exit();
})();