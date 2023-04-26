const User = require("../models/user")
const genPassword = require("../lib/passwordUtils").genPassword

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
            "department": req.body.department
        })
        await newUser.save()
        return res.status(200).json({msg: "User is successfully created"})
    } catch(err){
        console.log(`error occured in user_controller create session ${err}`)
        return res.status(401).json({msg: "error occured in creating user"})
    }
}

module.exports.createSession = (req,res) => {
    return res.status(200).json({msg: "you are logged in"})
}