const {userSchema} = require('../models/user.model')
const {Router} = require('express')
const {registerUser} = require('../controllers/user.controller')

const UserRouter =  Router();

UserRouter.post(
    '/signup', 
)