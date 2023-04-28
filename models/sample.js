const mongoose = require("mongoose")

const sampleSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
      },
    city: String,
    name_of_fso: String,
    sampling_location: String,
    eureka_sampler: String,
    approval_status: {
        type: String,
        required: true,
        enum: ['WAITING', 'APPROVED', 'REJECTED']
    },
    name_of_sample: String,
    outlet_name: String,
    batch_no: String,
    mfd_date: Date,
    exp_date: Date,
    sample_image: String,
    location_image: String
},{
    timestamps: true
})

Sample = mongoose.model("sample",sampleSchema)

module.exports = Sample