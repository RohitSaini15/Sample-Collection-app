const nodemailer = require("../config/nodemailer")
const VerifyEmail = require("../models/verify_email")
const crypto = require("crypto")
const ejs = require("ejs")

module.exports.sendVerifyEmail = async (user) => {
    const accessToken = crypto.randomBytes(20).toString('hex')
    const newVerifyEmail = new VerifyEmail({
        user: user,
        isValid: false,
        accessToken: accessToken
    })
    await newVerifyEmail.save()

    let renderHTMLString = await ejs.renderFile("./views/verify_email.ejs",{accessToken,"base_url":process.env.BASE_URL},{async: true})

    await nodemailer.transporter.sendMail({
        'from': process.env.GMAIL_ID,
        'to': user.email,
        'subject': 'verify your email',
        'html': renderHTMLString
    })
    console.log("verification mail successfull sended")
}