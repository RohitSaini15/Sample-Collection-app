const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS
    }
})

module.exports = {
    transporter
}