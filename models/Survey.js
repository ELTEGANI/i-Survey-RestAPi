const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const Surveys = sequelize.define('Surveys', {
id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
},
title: {
  type: Sequelize.STRING,
  allowNull: false
},
description: {
  type: Sequelize.STRING,
  allowNull: false
}  
});  

module.exports = Surveys;
