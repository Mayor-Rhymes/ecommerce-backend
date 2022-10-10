const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const signup = asyncHandler(async(req, res) => {

    const {username, email, password, roles} = req.body;

    try{

        const user = await User.signup(username, email, password, roles);
        token = generateToken(user._id);
        res.status(200).json({username: user.username, email:user.email, roles:user.roles, token: token});

    } catch(err){
        res.status(404).json({message: err.message});

    }
    

    

})

const login = asyncHandler(async(req, res) => {


    const {email, password} = req.body;

    try{

        const user = await User.login(email, password);
        token = generateToken(user._id);
        res.status(200).json({username: user.username, email:user.email, roles: user.roles, token: token});

    } catch(err){
        res.status(404).json({message: err.message});
        
    }
    

})


const generateToken = (id) => {

   return jwt.sign({id}, process.env.JWTSECRET, {

    expiresIn: "30d"


   })
    

}


module.exports = {


    signup,
    login
}