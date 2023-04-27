const nodemailer = require("../config/nodemailer")
const PasswordReset = require("../models/password_reset")
const crypto = require("crypto")
const ejs = require("ejs")

module.exports.sendResetEmail = async (user) => {
    const accessToken = crypto.randomBytes(20).toString('hex')
    const newPasswordReset = new PasswordReset({
        user: user,
        isValid: true,
        accessToken: accessToken
    })
    await newPasswordReset.save()

    let renderHTMLString = await ejs.renderFile("./views/mailers/password_reset.ejs",{accessToken,"base_url":process.env.BASE_URL},{async: true})

    await nodemailer.transporter.sendMail({
        'from': process.env.GMAIL_ID,
        'to': user.email,
        'subject': 'password reset',
        'html': renderHTMLString
    })
    console.log("password reset mail successfull sended")
}