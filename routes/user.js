const express = require("express")
const router = express.Router()
const user_controller = require("../controllers/user_controller")
const passport = require("../config/passport-local-strategy")

router.post("/create",user_controller.createUser)
router.post("/createSession",passport.authenticate("local"),user_controller.createSession)
router.get("/verify",user_controller.verifyEmail)

module.exports = router