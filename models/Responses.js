const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const Resonses = sequelize.define('Resonses', {
id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
},
Answer: {
    type: Sequelize.STRING,
    allowNull: false
  }  
  });   


module.exports = Resonses;
