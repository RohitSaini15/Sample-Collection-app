const crypto = require("crypto")

function genPassword(password){
    let salt = crypto.randomBytes(32).toString('hex')
    let password_hash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')

    return {
        salt,
        password_hash
    }
}

function verifyPassword(password,hash_password,salt){
    let hashVerifyPassword = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')
    
    return hash_password === hashVerifyPassword
}

module.exports.genPassword = genPassword
module.exports.verifyPassword = verifyPassword