const {validationResult} = require('express-validator/check');
const Admin = require('../models/Admin');
const Collector = require('../models/Collector');
const Surveys = require('../models/Survey');
const Questions = require('../models/Questions');
const Qusetiontype = require('../models/question_type');
const QuestionAnswer = require('../models/Question_answers');
const SurveyQuestion = require('../models/Survey_Questions');
const SamplePerson = require('../models/SamplePerson')
const SurveyResponse = require('../models/Survey_Response');
const Responses = require('../models/Responses');
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
           const token = jwt.sign({adminId:loadedadmin.id},'QuestionaireAdminAdminAdmin');
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
            password:hashedpw,
            AdminId:req.companyId
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

exports.createSurvey = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error('validation Failed');
       error.statusCode = 409;
       error.data = errors.array();
       throw error
    }
    
    const surveyTitle            = req.body.title;
    const surveyDescription      = req.body.description;
    const surveyType             = req.body.surveyType;
    

    Surveys.create({
        title:surveyTitle,
        description:surveyDescription,
        surveyType:surveyType,
        AdminId:req.companyId
        }).then(result =>{
        res.status(201).json({
         message:'Survey Created Successfully',
         Surveys:result,
     }  
     
     );
     }).catch( err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
     })
}

 exports.createQuestion =(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error('validation Failed');
       error.statusCode = 422;
       error.data = errors.array();
       throw error
    } 
    const question      = req.body.question;
    Questions.create({
        Qusetion:question 
        })    
        .then(question =>{
            console.log(question);
            const qid = question.id;
    Qusetiontype.create({
            question_type:req.body.questiontype,
            QuestionId:qid
        }).then(res=>{
    req.body.Answers.map((answers) => {
        QuestionAnswer.create({
                    QuestionAnswer:answers.answer,
                    QuestionId:qid
                }).then(res=>{
                  console.log(res)
                }).catch(err=>{
                  console.log(err)
                })
             })
        })
 
    .then(qanswers=>{  
    SurveyQuestion.create({
        SurveyId:req.body.Surveyid,
        QuestionId:qid   
    }).then(surveyquestion=>{
           res.status(201).json({
           message:'Question Created Successfully',
           Question:surveyquestion,
        }
    );
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })    
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
        }).catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }).catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
     
 }


 exports.loginCollector=(req,res,next)=>{
    const collectorEmail = req.body.email;
    const password     = req.body.password;
    let loadedCollector;
    Collector.findOne({where:{email:collectorEmail}})
    .then(userCollector=>{
        if(!userCollector){
          const error = new Error('User With This Email Couldnt Be Found');
          error.statusCode = 401;
          throw error;
        }
        loadedCollector = userCollector;
        return bcrypt.compare(password,userCollector.password);
    })  
    .then(isEqual=>{
        if(!isEqual){
         const error = new Error('Worng Password');
         error.statusCode = 401;
         throw error;
        }
        const token = jwt.sign({CollectorId:loadedCollector.id,
            AdminId:loadedCollector.AdminId},'CollectorAdminAdminAdmin');
        res.status(200).json({accesstoken:token,AdminId:loadedCollector.AdminId})
    })
    .catch(err =>{
     if(!err.statusCode){
         err.statusCode = 500;
     }
     next(err);
    })
 }



 exports.signupSamplePerson = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error('validation Failed');
       error.statusCode = 422;
       error.data = errors.array();
       throw error
    }
    const age         = req.body.age;
    const gender      = req.body.gender;
    const job         = req.body.job;
    const educationLevel   = req.body.educationLevel;
    const addressArea      = req.body.addressArea;
    const locationlongtude         = req.body.longtude;
    const locationlatitude         = req.body.latitude;
    const companyfield          = req.body.companyfield;
    const companysize           = req.body.companysize;
    const companylocation       = req.body.companylocation;
    const companyFoundationDate = req.body.companyFoundationDate;

    SamplePerson.create({
        age:age,
        gender:gender,
        job:job,
        educationLevel:educationLevel,
        addressArea:addressArea,
        locationlongtude:locationlongtude,
        locationlatitude:locationlatitude,
        companyfield:companyfield,
        companysize:companysize,
        companylocation:companylocation,
        companyFoundationDate:companyFoundationDate,
        CollectorId:req.collectorId
        }).then(result =>{
        res.status(201).json({
         message:'SamplePerson Created Successfully',
         SamplePerson:result,
     }
     );
     }).catch( err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
     })
}

 exports.saveResponse=(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error('validation Failed');
       error.statusCode = 422;
       error.data = errors.array();
       throw error
    }

    const survey_id            = req.body.surveyId;
    const sampledata_id        = req.body.sampledataid;
    const question_id          = req.body.questionid;
    const sampledata_answer    = req.body.sampledataanswer;

    SurveyResponse.create({
        SurveyId:survey_id,
        SamplePersonId:sampledata_id
    }).then(surveyresponse_id=>{
        Responses.create({
            SamplePersonId:sampledata_id,
            QuestionId:question_id,
            SurveyResonseId:surveyresponse_id.id,
            Answer:sampledata_answer
        }).then(response=>{
            res.status(201).json({
                message:'Response Created Successfully',
                Response:response,
            });
        }).catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
 }




 exports.getAllSamplePerson=(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error('validation Failed');
       error.statusCode = 422;
       error.data = errors.array();
       throw error
    }
    const survey_id            = req.body.surveyId;
    SurveyResponse.count({where:{'SurveyId':survey_id}})
    .then(participaters=>{
        res.status(201).json({
            message:'Participators In Survey',
            Participators:participaters,
      });
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
    
 }