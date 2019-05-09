const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const Questiontype = sequelize.define('Question_type', {
id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
},
question_type: {
  type: Sequelize.STRING,
  allowNull: false
}  
});  

module.exports = Questiontype;
