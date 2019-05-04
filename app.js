const express = require('express');
const sequelize = require('./config/configration');
const bodyParser = require('body-parser');
  

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

    
sequelize.sync().then(result =>{
    console.log(result);
    app.listen(8080); 
}).catch(err =>{
    console.log(err)
})


