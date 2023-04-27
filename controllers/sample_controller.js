const Sample = require("../models/sample")

module.exports.scheduleASample = async(req,res)=>{
try {
     
    const newSample = new Sample({
        "user":req.body.user,
        "city": req.body.city,
        "name_of_fso": req.body.name_of_fso,
        "sampling_location": req.body.sampling_location,
        "eureka_sampler": req.body.eureka_sampler,
        "approval_status": req.body.approval_status
    })
    const response =await newSample.save()
    res.status(200).json({msg: "sample scheduled successfully"})
} catch (err) {
    console.log(`error occured in sample_controller scheduleASample ${err}`)
    return res.status(401).json({msg: "error occured in Scheduling a sample"})
}

}

module.exports.samplingSurvey =async(req,res)=>{
try {
    let sample = await Sample.findById(req.params.id);
    if(!sample){
        res.status(404).send("sample does not exist");
    }
    const newSample={
        user:sample.user,
        city :sample.city,
        name_of_fso :sample.name_of_fso,
        sampling_location:sample.sampling_location,
        eureka_sampler:sample.eureka_sampler,
        approval_status:sample.approval_status,
        name_of_sample :req.body.name_of_sample,
        outlet_name :req.body.outlet_name,
        batch_no :req.body.batch_no,
        exp_date :new Date(req.body.exp_date),
        mfd_date:new Date(req.body.mfd_date),
        sample_image:req.body.sample_image,
        location_image :req.body.location_image
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
        
        const samples =await Sample.find({user:req.body.user});
        console.log(req.body.user);
        res.status(200).send(samples);
    } catch (error) {
        console.log(`error occured in sample_controller approvedSamples ${err}`);
        return res.status(401).json({msg: "error occured in fteching approved samples"});
    }
}

module.exports.changeApprovleStatus=async(req,res)=>{
    try {
     let sample = await Sample.findByIdAndUpdate(req.params.id,{approval_status:req.body.approval_status});
     sample =await Sample.findById(req.params.id)
     res.send(sample)
   
    } catch (error) {
        console.log(`error occured in sample_controller changeApprovle ${err}`);
        return res.status(401).json({msg: "error occured in change approvle status of sample"});
    }
   
}