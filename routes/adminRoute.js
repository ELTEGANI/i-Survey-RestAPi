const express = require('express');
const {body} = require('express-validator/check');
const admincontroller = require('../controllers/adminController');
const Admin = require('../models/Admin');
const Collector = require('../models/Collector');
const Survey = require('../models/Survey');
const Question = require('../models/Questions');
const isAuth = require('./Middleware/authMiddleware');
const isCollectorAuth = require('./Middleware/authMiddlewareForCollector');  
const Surveyresponse =require('../models/Survey_Response');
const router = express.Router();

router.post('/addadmin',[body('companyemail')
        .isEmail()
        .withMessage('Please Enter Valid EmailAddress')
        .custom((value,{req})=>{
            return Admin.findOne({where:{companyemail:value}}).then(admindoc=>{
               if(admindoc){
                   return Promise.reject('Email Address Already Exists');
               }
            });
        })
        .normalizeEmail(),
        body('password').trim().isLength({min:3}),
        body('firstname').trim().not().isEmpty(),
        body('lastname').trim().not().isEmpty(),
        body('companyname').trim().not().isEmpty(),
        body('companyfield').trim().not().isEmpty(),
        body('companyemail').trim().not().isEmpty()      
       ],admincontroller.signup);

router.post('/login',admincontroller.login);

router.post('/addcollector',isAuth,[body('email')
.isEmail()
.withMessage('Please Enter Valid EmailAddress')
.custom((value,{req})=>{
    return Collector.findOne({where:{email:value}}).then(collectordoc=>{
       if(collectordoc){
           return Promise.reject('Collector Already Exists');
       }
    });
})
.normalizeEmail(),
body('password').trim().isLength({min:3}),
body('firstname').trim().not().isEmpty(),
body('lastname').trim().not().isEmpty(),
body('email').trim().not().isEmpty()      
],admincontroller.signUpCollector);


router.post('/createsurvey',isAuth,[body('title')
.custom((value,{req})=>{
    return Survey.findOne({where:{title:value}}).then(Surveydoc=>{
       if(Surveydoc){
           return Promise.reject('Survey Already Exists');
       }
    });
})
,body('title').trim().trim().not().isEmpty(),
body('description').trim().not().isEmpty(),
body('surveyType').trim().not().isEmpty()
],admincontroller.createSurvey)



router.post('/createquestion',isAuth,[body('question')
.custom((value,{req})=>{
    return Question.findOne({where:{Qusetion:value}}).then(Questiondoc=>{
       if(Questiondoc){
           return Promise.reject('Question Already Exists');
       }
    });
})
,body('question').trim().not().isEmpty()
,body('questiontype').trim().not().isEmpty()
,body('Answers').trim().not().isEmpty()
,body('Surveyid').trim().not().isEmpty()
],admincontroller.createQuestion)
      

router.post('/loginCollector',admincontroller.loginCollector);


router.post('/addSamplePerson',isCollectorAuth,admincontroller.signupSamplePerson);




router.post('/saveResponse',isCollectorAuth,[body('sampledataid')
    .custom((value,{req})=>{
        return Surveyresponse.findOne({where:{SamplePersonId:value}}).then(sampledataIddoc=>{
           if(sampledataIddoc){
               return Promise.reject('Response Already Exists');
           }
        });
    }),
    body('surveyId').trim().not().isEmpty(),
    body('sampledataid').trim().not().isEmpty(),
    body('questionid').trim().not().isEmpty(),
    body('sampledataanswer').trim().not().isEmpty(),
],admincontroller.saveResponse);


router.get('/getallsampleperson',isCollectorAuth,
[body('surveyId').trim().not().isEmpty()],admincontroller.getAllSamplePerson)


module.exports = router;
