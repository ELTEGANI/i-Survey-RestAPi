const Sequelize = require('sequelize');

const sequelize = new Sequelize('Survey','root','root123', { 
    operatorsAliases: false ,
    dialect: 'mysql',
    host:'localhost'

});
  
module.exports = sequelize;


  