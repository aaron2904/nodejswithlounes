const express = require('express')
    authController = require('../controller/authController');
    authRoutes = express.Router();

module.exports = (app) => {
    authRoutes.post('/login', authController.login)
    authRoutes.post('/sign-up', authController.signUp)
    app.use('/api/v1', authRoutes) 
}
 