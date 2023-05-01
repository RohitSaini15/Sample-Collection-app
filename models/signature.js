const mongoose = require("mongoose")

const signatureSchema = mongoose.Schema({
  sample:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'sample',
        required: true,
        unique:true
  },
  fso_signature_image:String,
  si_signature_image:String
},{
    timestamps: true
})

Signature = mongoose.model("signature",signatureSchema)

module.exports = Signature