const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const Questions = sequelize.define('Questions', {
id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
},
Qusetion: {
  type: Sequelize.STRING,
  allowNull: false
}  
});  

module.exports = Questions;
