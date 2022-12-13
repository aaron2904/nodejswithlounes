require('dotenv').config();

const User = require('../models/userModel'),
      bcrypt = require('bcrypt'),
      passport = require('passport'),
      jwt = require('jsonwebtoken');

function generateToken(user){
    return jwt.sign(user, process.env.SECRET_PASS, {
        expiresIn: '1y'
    })
}

/**
 * Method used for try to logged the user
 * @param req
 * @param res
 * @param next
 */
exports.login = (req, res, next) => {
    passport.authenticate('local', {session: false}, async (user, err, info) => {
    if (err){
        return res.status(400).json(err)
    }
    if (!user){
        return res.status(422).json(err)
    }
    console.log('esrzer', user)
    const currentUser = await  User.findOne({
        where: {email: req.body.email}
    })
    return res.status(200).json({
        token: 'JWT ' + generateToken({
            id: currentUser.id,
            email: currentUser.email,
            password: currentUser.passwort
        }),
        id: currentUser.id,
        email: currentUser.email,
    })
  })(req, res, next)
};
 /**
 * Method used for try to create new user
 * @param req
 * @param res
 * @param next
 */
exports.signUp = async (req, res, next) => {
    // verification que le body n'est pas vide
    if(Object.keys(req.body).lenght === 0 ){return res.status(400).json({msg: 'BAD REQUEST'})}
    // verification que l'email et/ou le password ne sont pas vide'
    if(req.body.email.length === 0 || req.body.password.length === 0 ){return res.status(400).json({msg: 'BAD REQUEST'})}
    // verification que le user existe deja 
    const isExistUser = await User.findOne({
        where: {email: req.body.email}
    })  
    // console.log('isExistUser ==> ', isExistUser)
    // console.log('!!isExistUser ==> ', !!isExistUser)

    // si le user n'existe pas, alors on l'insère sinon return BAD REQUEST
    if(isExistUser === null){
        try{
            const hash = bcrypt.hashSync(req.body.password, 10)
            const user = await User.create({
                email: req.body.email,
                password: hash
            })
            console.log("user", user)
            return res.status(201).json({msg: 'OK', user})
        } 
        // retourne une erreur dans le cas ou il y a une erreur lors de l'insertion dans la bdd
        catch (e) {
            return res.status(400).json({msg: e.message})
        }
    }
    return res.status(422).json({msg: 'BAD REQUEST'})
};
