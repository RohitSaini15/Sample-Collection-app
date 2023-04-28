const express = require("express")
const router = express.Router()
const sample_controller = require("../controllers/sample_controller")
const passport = require("../config/passport-local-strategy")
const upload = require("../config/multer")

router.post("/scheduleasample",passport.isAuth,sample_controller.scheduleASample)
router.post("/samplingsurvey/:id",passport.isAuth,upload.fields([{name: "sample_image",maxCount: 1},{name: "location_image",maxCount: 1}]),sample_controller.samplingSurvey)
router.get("/getallsamples",passport.isAuth,sample_controller.getAllSamples)
router.post("/changeapprovalstatus/:id",passport.isFSO,sample_controller.changeApprovalStatus)
router.get("/getsamplecity",passport.isAuth,sample_controller.getSampleFromCity)
router.get("/getsamplefso",passport.isAuth,sample_controller.getSampleFso)
module.exports = router