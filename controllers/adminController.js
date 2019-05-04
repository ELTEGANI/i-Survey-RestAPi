const {validationResult} = require('express-validator/check');
const Admin = require('../models/Admin');
const Collector = require('../models/Collector');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');


exports.signup = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error('validation Failed');
       error.statusCode = 422;
       error.data = errors.array();
       throw error
    }
    const firstname     = req.body.firstname;
    const lastname      = req.body.lastname;
    const companyname   = req.body.companyname;
    const companyfield  = req.body.companyfield;
    const companyemail  = req.body.companyemail;
    const password      = req.body.password;

    bcrypt.hash(password,12)
    .then(hashedpw=>{
        Admin.create({
            firstname:firstname,
            lastname:lastname,
            companyname:companyname,
            companyfield:companyfield,
            companyemail:companyemail,
            password:hashedpw
        }).then(result =>{
            res.status(201).json({
             message:'Admin Created Successfully',
             Admin:result
         });
         })
        .catch(
            err =>{
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
             }
        )  
    })
}



exports.login = (req,res,next) => {
       const companyemail = req.body.companyemail;
       const password     = req.body.password;
       let loadedadmin;
       Admin.findOne({where:{companyemail:companyemail}})
       .then(useradmin=>{
           if(!useradmin){
             const error = new Error('User With This Email Couldnt Be Found');
             error.statusCode = 401;
             throw error;
           }
           loadedadmin = useradmin;
           return bcrypt.compare(password,useradmin.password);
       })  
       .then(isEqual=>{
           if(!isEqual){
            const error = new Error('Worng Password');
            error.statusCode = 401;
            throw error;
           }
           const token = jwt.sign({adminId:loadedadmin.id},'QuestionaireAdminAdminAdmin',
           {expiresIn:'24h'});
           res.status(200).json({accesstoken:token,companyId:loadedadmin.id})
       })
       .catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
       })
}

exports.signUpCollector = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error('validation Failed');
       error.statusCode = 422;
       error.data = errors.array();
       throw error
    }
    const firstname     = req.body.firstname;
    const lastname      = req.body.lastname;
    const email         = req.body.email;
    const password      = req.body.password;

    bcrypt.hash(password,12)
    .then(hashedpw=>{
        Collector.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:hashedpw
        }).then(result =>{
            res.status(201).json({
             message:'Collector Created Successfully',
             Collector:result
         });
         })
        .catch(
            err =>{
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
             }
        )  
    })

}
