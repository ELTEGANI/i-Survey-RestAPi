const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const SurveyQuestions = sequelize.define('SurveyQuestions', {
id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
}  
});  

module.exports = SurveyQuestions;
