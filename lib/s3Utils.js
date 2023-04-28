const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3")
const crypto = require("crypto")

module.exports.s3Upload = async (file) => {
    const s3Client = new S3Client()

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${crypto.randomBytes(32).toString('hex')}_${file.originalname}`,
        Body: file.buffer
    }

    await s3Client.send(new PutObjectCommand(params))
    let s3Url = `${process.env.AWS_BUCKET_BASE_URL}/${params.Key}`

    return s3Url
}