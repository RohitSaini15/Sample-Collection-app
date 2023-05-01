const express = require("express")
const router = express.Router()
const passport = require("../config/passport-local-strategy")

const adminController = require("../controllers/admin_controller")

router.get("/login",adminController.adminLogin)
router.post("/createAdminSession",passport.authenticate("local"),adminController.adminSession)
router.get("/create_user",adminController.createUser)

module.exports = router