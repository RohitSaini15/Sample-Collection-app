const express = require("express")
const router = express.Router()
const user_controller = require("../controllers/user_controller")
const passport = require("../config/passport-local-strategy")

router.post("/create",user_controller.createUser)
router.post("/createSession",passport.authenticate("local"),user_controller.createSession)
router.get("/verify",user_controller.verifyEmail)
router.post("/send_mail/password_reset",user_controller.sendMailPasswordReset)
router.get("/password_reset",user_controller.passwordReset)
router.post("/password_reset",user_controller.passwordReset)
router.get("/create",user_controller.createUserByAdmin)
module.exports = router