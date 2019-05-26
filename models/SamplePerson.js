const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const SamplePerson = sequelize.define('SamplePersons', {
age:{
  type: Sequelize.INTEGER,
  allowNull: false
},
gender: {
  type: Sequelize.STRING,
  allowNull: false
},
job:{
    type: Sequelize.STRING,
    allowNull: false
},
educationLevel:{
    type: Sequelize.STRING,
    allowNull: false
},   
addressArea:{
  type: Sequelize.STRING,
  allowNull: false
},  
locationlongtude:{
  type: Sequelize.STRING,
  allowNull: false
},
locationlatitude:{
  type: Sequelize.STRING,
  allowNull: false
},
companyfield:{
  type: Sequelize.STRING,
  allowNull: false
},
companysize:{
  type: Sequelize.STRING,
  allowNull: false
},
companylocation:{
  type: Sequelize.STRING,
  allowNull: false
},
companyFoundationDate:{
  type: Sequelize.STRING,
  allowNull: false
}
});

module.exports = SamplePerson;
