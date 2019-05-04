const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const Collector = sequelize.define('Collectors', {
id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
},
firstname: {
  type: Sequelize.STRING,
  allowNull: false
},
lastname: {
  type: Sequelize.STRING,
  allowNull: false
},
email: {
    type: Sequelize.STRING,
    allowNull: false
},
password: {
    type: Sequelize.STRING,
    allowNull: false
}
});

module.exports = Collector;
