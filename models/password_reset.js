const mongoose = require('mongoose')

const PasswordResetSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    },
    accessToken: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
})

const PasswordReset = mongoose.model("passwordreset",PasswordResetSchema)

module.exports = PasswordReset