const User = require("../models/user")
const genPassword = require("../lib/passwordUtils").genPassword
const sendVerifyEmail = require("../mailer/verify_email").sendVerifyEmail
const sendResetEmail = require("../mailer/password_reset").sendResetEmail
const VerifyEmail = require("../models/verify_email")
const PasswordReset = require("../models/password_reset")

module.exports.createUser = async (req,res) => {
    try{
        if(req.body.password != req.body.confirm_password) return res.status(200).json({msg: "password doesn't match"})
        let user = await User.findOne({"email": req.body.email})

        if(user){
            if(user.verified) return res.status(200).json({msg: "email already exists",status:"ERROR"})
            await User.findByIdAndDelete(user.id)
        }

        const saltHash = genPassword(req.body.password)

        const newUser = new User({
            "email": req.body.email,
            "password_hash": saltHash.password_hash,
            "salt": saltHash.salt,
            "admin": req.body.admin || false,
            "name": req.body.name,
            "department": req.body.department,
            "verified": false,
            "type": req.body.type
        })
        await newUser.save()
        await sendVerifyEmail(newUser)
        return res.status(200).json({msg: "User is successfully created",status:"SUCCESS"})
    } catch(err){
        console.log(`error occured in user_controller create session ${err}`)
        return res.status(401).json({msg: "error occured in creating user",status:"ERROR"})
    }
}

module.exports.createSession = (req,res) => {
    return res.status(200).json({msg: "you are logged in",status:"SUCCESS"})
}

module.exports.verifyEmail = async (req,res) => {
    try{
        let doc = await VerifyEmail.find({accessToken: req.query.accessToken})
        if(doc.length){
            await User.findByIdAndUpdate(doc[0].user,{verified: true}) 
            return res.status(200).json({msg:"email is verified",status:"SUCCESS"})
        }
        return res.status(401).json({msg:"there is no record with this token",status:'SUCCESS'})
    } catch(err){
        console.log(`error occured in verifying Email in user_controller ${err}`)
        return res.status(401).json({msg: "error occured in verifying email",status:"ERROR"})
    }
}

// email will be provided in this route and generate token
module.exports.sendMailPasswordReset = async (req,res) => {
    try{
        let user = await User.findOne({"email":req.body.email})
        if(user && user.verified){
            await PasswordReset.findOneAndDelete({user:user.id})
            await sendResetEmail(user)
            return res.status(200).json({msg: "reset password mail successfully send",status:"SUCCESS"})
        } 

        return res.status(401).json({msg: "email could not found",status:"ERROR"})
    } catch(err){
        console.log(`error occured in sendMailPasswordReset in user_controller ${err}`)
        return res.status(401).json({msg: "error occured in verifying email",status:"ERROR"})
    }
}

// get and post request for showing page for password and confirm password
module.exports.passwordReset = async (req,res) => {
    if (req.method == 'GET') return res.render('password_reset')

    try{
        if(req.body.password != req.body.confirm_password) return res.status(200).json({msg: "password not matched",status:"ERROR"})
        let token = await PasswordReset.findOne({accessToken: req.query.accessToken})

        if(token && token.isValid){
            const saltHash = genPassword(req.body.password)
            await User.findByIdAndUpdate(token.user,{"password_hash": saltHash.password_hash,"salt": saltHash.salt}) 
            await PasswordReset.findByIdAndUpdate(token.id,{isValid: false})
            return res.status(200).json({msg: "password successfully changed"})
        }

        return res.status(401).json({msg: "token could not found or either expired",status:"ERROR"})
    } catch(err){
        console.log(`error occured in PasswordReset in user_controller ${err}`)
        return res.status(401).json({msg: "error occured in password reset",status:"ERROR"})
    }
}

module.exports.createUserByAdmin =async(req,res)=>{
      return res.render('create_user')
}