const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const SurveyResonse = sequelize.define('SurveyResonses', {
id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
}  
});  

module.exports = SurveyResonse;
