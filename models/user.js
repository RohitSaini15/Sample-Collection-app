const mongoose = require("mongoose")

userSchema=mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['ADMIN', 'FSO', 'FI']
    }
},{
    timestamps: true
})

User = mongoose.model('user',userSchema)

module.exports = User