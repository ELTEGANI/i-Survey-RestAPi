const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const Admin = sequelize.define('Admins', {
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
},
firstname: {
  type: Sequelize.STRING,
  allowNull: false
},
lastname: {
  type: Sequelize.STRING,
  allowNull: false
},
companyname: {
    type: Sequelize.STRING,
    allowNull: false
},
companyfield: {
    type: Sequelize.STRING,
    allowNull: false
},
companyemail: {
    type: Sequelize.STRING,
    allowNull: false
},
password: {
    type: Sequelize.STRING,
    allowNull: false
}
});

module.exports = Admin;
