require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const port = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); 
    console.log('DB OK, connected and synced');
    app.listen(port, () => console.log(`Server running on ${port}`));
  } catch (err) {
    console.error('DB connection failed', err);
  }
})();