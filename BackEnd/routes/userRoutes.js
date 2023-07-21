const express = require('express');

const UserController=require('../controllers/userController');
const router= express.Router();

router.get('/',UserController.getUsers);
router.post('/',UserController.addUser);
router.post('/login',UserController.loginUser);
router.post('/password/forgotpassword',UserController.forgotpassword)
router.get('/password/resetpassword/:ID',UserController.resetPassword)
router.get('/password/upgradepassword/:ID',UserController.upgradePassword)


module.exports=router;