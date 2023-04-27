const User = require("../models/user")
const genPassword = require("../lib/passwordUtils").genPassword
const sendVerifyEmail = require("../mailer/verify_email").sendVerifyEmail
const VerifyEmail = require("../models/verify_email")

module.exports.createUser = async (req,res) => {
    try{
        if(req.body.password != req.body.confirm_password) return res.status(200).json({msg: "password doesn't match"})
        let user = await User.find({"email": req.body.email})

        if(user.length != 0) return res.status(200).json({msg: "email already exists"})

        const saltHash = genPassword(req.body.password)

        const newUser = new User({
            "email": req.body.email,
            "password_hash": saltHash.password_hash,
            "salt": saltHash.salt,
            "admin": true,
            "name": req.body.name,
            "department": req.body.department,
            "verified": false
        })
        await newUser.save()
        await sendVerifyEmail(newUser)
        return res.status(200).json({msg: "User is successfully created"})
    } catch(err){
        console.log(`error occured in user_controller create session ${err}`)
        return res.status(401).json({msg: "error occured in creating user"})
    }
}

module.exports.createSession = (req,res) => {
    return res.status(200).json({msg: "you are logged in"})
}

module.exports.verifyEmail = async (req,res) => {
    try{
        let doc = await VerifyEmail.find({accessToken: req.query.accessToken})
        if(doc.length){
            await User.findByIdAndUpdate(doc[0].user,{verified: true}) 
            return res.status(200).json({msg:"email is verified"})
        }
        return res.status(401).json({msg:"there is no record with this token"})
    } catch(err){
        console.log(`error occured in verifying Email in user_controller ${err}`)
        return res.status(401).json({msg: "error occured in verifying email"})
    }
}