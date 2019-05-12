const express = require('express');
const {body} = require('express-validator/check');
const admincontroller = require('../controllers/adminController');
const Admin = require('../models/Admin');
const Collector = require('../models/Collector');
const Survey = require('../models/Survey');
const Question = require('../models/Questions');
const isAuth = require('./Middleware/authMiddleware');
const isCollectorAuth = require('./Middleware/authMiddlewareForCollector');  


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
],admincontroller.createSurvey)



router.post('/createquestion',isAuth,[body('Qusetion')
.custom((value,{req})=>{
    return Question.findOne({where:{Qusetion:value}}).then(Questiondoc=>{
       if(Questiondoc){
           return Promise.reject('Question Already Exists');
       }
    });
})
,body('Qusetion').trim().not().isEmpty()
,body('Qusetiontype').trim().not().isEmpty()
,body('Qusetionanswers').trim().not().isEmpty()
,body('Surveyid').trim().not().isEmpty()
],admincontroller.createQuestion)
      

router.post('/loginCollector',admincontroller.loginCollector);


router.post('/addSamplePerson',isCollectorAuth,[
    body('age').trim().not().isEmpty(),
    body('gender').trim().not().isEmpty(),
    body('job').trim().not().isEmpty(),
   ],admincontroller.signupSamplePerson);



module.exports = router;
