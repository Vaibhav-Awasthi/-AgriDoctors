const passport=require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Person=require('./models/Person')

passport.use(new LocalStrategy(async (username,pass,done)=>{
    try{

        const user=await Person.findOne({username:username})
        if(!user){
            console.log("Invalid username ")
            return done(null,false,{message:'Invalid username or password'})

        }

        const isPass=user.comparePass(pass);
        
        if(isPass){
            return done(null,user)
        }
        else{
            console.log("Invalid  password")
            return done(null,false,{message:'Invalid username or password'})
        }

    }catch(err){
        console.log(err)
        return done(err)
    }
}))

module.exports=passport