const express    = require('express');
const sequelize  = require('./config/configration');
const bodyParser = require('body-parser');
const Collectors = require('./models/Collector');
const Admins     = require('./models/Admin');
const Surveys    = require('./models/Survey');
const Questions  = require('./models/Questions');
const Questiontype = require('./models/question_type');
const QuestionAnswer = require('./models/Question_answers');
const SurveyQuestions = require('./models/Survey_Questions');
const SamplePerson = require('./models/SamplePerson');
const SurveyResponse = require('./models/Survey_Response');
const Responses = require('./models/Responses');
//set routes
const adminRoute = require('./routes/adminRoute');

//init express
const app = express()

app.use(bodyParser.json());//application/json


//setup CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



app.use('/Admin',adminRoute);

app.use((error,req,res,next)=>{
    console.log(error);
    const status  = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
    message:message,
    data:data
    });   
})

Collectors.belongsTo(Admins);
Admins.hasMany(Collectors);

Surveys.belongsTo(Admins);
Admins.hasMany(Surveys);

Questions.hasOne(Questiontype);

QuestionAnswer.belongsTo(Questions);
Questions.hasMany(QuestionAnswer);

Surveys.belongsToMany(Questions,{through:SurveyQuestions});
Questions.belongsToMany(Surveys,{through:SurveyQuestions});

SamplePerson.belongsTo(Collectors);
Collectors.hasMany(SamplePerson);


Surveys.belongsToMany(SamplePerson,{through:SurveyResponse});
SamplePerson.belongsToMany(Surveys,{through:SurveyResponse});

SurveyResponse.belongsToMany(SamplePerson,{through:Responses});
SamplePerson.belongsToMany(SurveyResponse,{through:Responses});

Responses.belongsTo(Questions);
Questions.hasMany(Responses);


sequelize
       //.sync({force:true})
       .sync()      
      .then(result =>{   
      console.log(result);  
      app.listen(8080); 
}).catch(err =>{
      console.log(err)
})


