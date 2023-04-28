const multer = require("multer")

const storage = multer.memoryStorage()

const fileFilter = (req,file,cb) => {
    if(file.mimetype.split('/')[0] === "image"){
        cb(null,true)
    } else{
        cb(new Error("file type is not valid"),false)
    }
}

const upload = multer({storage,fileFilter})
// const multiUpload = upload.fields([{name: "sample_image",maxCount: 1},{name: "location_image",maxCount: 1}])

module.exports = upload