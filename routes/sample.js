const express = require("express")
const router = express.Router()
const sample_controller = require("../controllers/sample_controller")


router.post("/scheduleasample",sample_controller.scheduleASample)
router.post("/samplingsurvey/:id",sample_controller.samplingSurvey)
router.get("/getallsamples",sample_controller.getAllSamples)
router.post("/changeapprovlestatus/:id",sample_controller.changeApprovleStatus)


module.exports = router