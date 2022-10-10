const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({


    username: {

        type: String,
        required: true,
        maxLength: 255,
        minLength: 4,


    },

    email: {

        type: String,
        required: true,
        maxLength: 255,
        minLength: 4, 
    },

    password: {
      
        type: String,
        required: true,
        
    }, 

    roles: {

        type: [
            { 
                type: String,
                enum: ['vendor', 'user', 'admin']
            }
        
        ],

        default: ['user']
    }


}, {timestamps: true});


userSchema.statics.signup = async function(username, email, password, roles = null){
    
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const userExists = await this.findOne({email});

      if(userExists){
         throw new Error("User with this email already exists");
 
      }
      
      const user = roles ? await this.create({username, email, roles, password: hashedPassword}) : await this.create({username, email, password: hashedPassword});

      

      if(!user){

        throw new Error("Please enter all credentials before signing up!");
      }

      return user;


      

    

}

userSchema.statics.login = async function(email, password){
    
    
     const user = await this.findOne({email});

     if(user && await bcrypt.compare(password, user.password)){
          
          return user;

          
     } else if(user && !await bcrypt.compare(password, user.password)){

        throw new Error("Password is incorrect")
     } else{
        
        
        throw new Error("User login failed!");
     }

}


module.exports = mongoose.model('User', userSchema);

