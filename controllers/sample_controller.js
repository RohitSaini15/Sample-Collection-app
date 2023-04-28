const Sample = require("../models/sample")
const s3Upload = require("../lib/s3Utils").s3Upload

module.exports.scheduleASample = async(req,res)=>{
    try {
        const newSample = new Sample({
            "user": req.user,
            "city": req.body.city,
            "name_of_fso": req.body.name_of_fso,
            "sampling_location": req.body.sampling_location,
            "eureka_sampler": req.body.eureka_sampler,
            "approval_status": req.body.approval_status
        })
        await newSample.save()
        res.status(200).json({msg: "sample scheduled successfully"})
    } catch (err) {
        console.log(`error occured in sample_controller scheduleASample ${err}`)
        return res.status(401).json({msg: "error occured in Scheduling a sample"})
    }
}

module.exports.samplingSurvey = async (req,res) => {
try {
    let sample = await Sample.findById(req.params.id);
    if(!sample){
        res.status(404).send("sample does not exist");
    }

    let s3SampleUrl = ""
    let s3LocationeUrl = ""
    
    if ("sample_image" in req.files) s3SampleUrl = await s3Upload(req.files.sample_image[0])
    if ("location_image" in req.files) s3LocationeUrl = await s3Upload(req.files.location_image[0])

    const newSample = {
        user: sample.user,
        city : sample.city,
        name_of_fso :sample.name_of_fso,
        sampling_location:sample.sampling_location,
        eureka_sampler:sample.eureka_sampler,
        approval_status:sample.approval_status,
        name_of_sample :req.body.name_of_sample,
        outlet_name :req.body.outlet_name,
        batch_no :req.body.batch_no,
        exp_date :req.body.exp_date,
        mfd_date:req.body.mfd_date,
        sample_image:s3SampleUrl,
        location_image :s3LocationeUrl
    };
    
    sample = await Sample.findByIdAndUpdate(req.params.id, { $set: newSample },{new:true});
    return res.json(sample);
} catch (err) {
    console.log(`error occured in sample_controller samplingSurvey ${err}`);
    return res.status(401).json({msg: "error occured in Scheduling a sample"});
}
}

module.exports.getAllSamples=async(req,res)=>{
    try {
        const samples =await Sample.find({});
        res.status(200).send(samples);
    } catch (error) {
        console.log(`error occured in sample_controller approvedSamples ${err}`);
        return res.status(401).json({msg: "error occured in fteching approved samples"});
    }
}

module.exports.changeApprovalStatus = async(req,res)=>{
    try {
        let sample = await Sample.findByIdAndUpdate(req.params.id,{approval_status:req.body.approval_status});
        sample = await Sample.findById(req.params.id)
        res.send(sample)
    } catch (error) {
        console.log(`error occured in sample_controller changeApprovle ${err}`);
        return res.status(401).json({msg: "error occured in change approvle status of sample"});
    }
   
}