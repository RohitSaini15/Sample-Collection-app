const mongoose = require("mongoose")

VerifyEmailSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    accessToken: {
        type:String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    }
})

VerifyEmail = mongoose.model('verifyemail',VerifyEmailSchema)

module.exports = VerifyEmail

