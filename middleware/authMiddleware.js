const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
      
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){

           const token = req.headers.authorization.split(' ')[1];

           try{

                const {id} = jwt.decode(token, process.env.JWTSECRET);
                const user = await User.findById(id).select('-password');

                req.user = user;
                next();

                
           } catch(err){

              console.log(err.message);
           }
      } else{

        res.status(404).json({message: "Authorization failed"});
      }




}


module.exports = {


    protect
}