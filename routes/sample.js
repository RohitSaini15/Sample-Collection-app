const express = require("express")
const router = express.Router()
const sample_controller = require("../controllers/sample_controller")


router.post("/scheduleasample",sample_controller.scheduleASample)
router.post("/samplingsurvey",sample_controller.samplingSurvey)
router.get("/getallsamples",sample_controller.getAllSamples)
router.post("/changeapprovlestatus",sample_controller.changeApprovleStatus)
router.get("/getsamplecity",sample_controller.getSampleFromCity)
router.get("/getsamplefso",sample_controller.getSampleFso)
module.exports = router