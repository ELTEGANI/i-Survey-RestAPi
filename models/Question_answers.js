const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const QuestionAnswer = sequelize.define('QuestionAnswer', {
id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
},
QuestionAnswer: {
  type: Sequelize.STRING,
  allowNull: false
}  
});  

module.exports = QuestionAnswer;
