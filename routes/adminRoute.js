const express = require('express');
const {body} = require('express-validator/check');
const admincontroller = require('../controllers/adminController');
const Admin = require('../models/Admin');



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




module.exports = router;
