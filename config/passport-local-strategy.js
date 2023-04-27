const passport = require("passport")
const LocalStrategy = require("passport-local")

const User = require("../models/user")
const verifyPassword = require("../lib/passwordUtils").verifyPassword

const customFields = {
    usernameField: "email"
}

const verifyCallback = async (email,password,done) => {
    try{
        let user = await User.findOne({"email": email})
        
        if(user.length == 0) return done(null,false)

        const isValid = verifyPassword(password,user.password_hash,user.salt)
        console.log(isValid)
        if(!isValid) return done(null,false)
        
        return done(null,user)
    } catch( err ){
        console.log(`error occured in verifyCallback in passport-local-strategy ${err}`)
        done(err , false)
    }
}

passport.use(new LocalStrategy(customFields,verifyCallback))

passport.serializeUser((user,done) => {
    return done(null,user.id)
})

passport.deserializeUser(async (userId,done) => {
    try{
        let user = await User.findById(userId)
        return done(null,user)
    } catch(err){
        console.log(`error occured in deserializeUser in passport-local-strategy ${err}`)
        done(err , false)
    }
})

passport.isAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(401).json({msg: "You are not authorized"})
}

passport.isAdmin = (req,res,next) => {
    if(req.isAuthenticated && req.user.admin){
        return next()
    }

    return res.status(401).json({msg: "You are not a admin user"})
}

passport.setAuthenticatedUser = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}

module.exports = passport