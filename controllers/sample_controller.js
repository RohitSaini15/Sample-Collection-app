const Sample = require("../models/sample");
const Signature = require("../models/signature");
const s3Upload = require("../lib/s3Utils").s3Upload;

module.exports.scheduleASample = async (req, res) => {
  try {
    const newSample = new Sample({
      user: req.user,
      city: req.body.city,
      name_of_fso: req.body.name_of_fso,
      sampling_location: req.body.sampling_location,
      eureka_sampler: req.body.eureka_sampler,
      approval_status: req.body.approval_status,
    });
    await newSample.save();
    res.status(200).json({ msg: "sample scheduled successfully" });
  } catch (err) {
    console.log(`error occured in sample_controller scheduleASample ${err}`);
    return res
      .status(401)
      .json({ msg: "error occured in Scheduling a sample" });
  }
};

module.exports.samplingSurvey = async (req, res) => {
  try {
    let sample = await Sample.findById(req.params.id);
    if (!sample) {
      res.status(404).send("sample does not exist");
    }

    let s3SampleUrl = "";
    let s3LocationeUrl = "";

    if ("sample_image" in req.files)
      s3SampleUrl = await s3Upload(req.files.sample_image[0]);
    if ("location_image" in req.files)
      s3LocationeUrl = await s3Upload(req.files.location_image[0]);

    const newSample = {
      user: sample.user,
      city: sample.city,
      name_of_fso: sample.name_of_fso,
      sampling_location: sample.sampling_location,
      eureka_sampler: sample.eureka_sampler,
      approval_status: sample.approval_status,
      name_of_sample: req.body.name_of_sample,
      outlet_name: req.body.outlet_name,
      batch_no: req.body.batch_no,
      exp_date: req.body.exp_date,
      mfd_date: req.body.mfd_date,
      sample_image: s3SampleUrl,
      location_image: s3LocationeUrl,
    };

    sample = await Sample.findByIdAndUpdate(
      req.params.id,
      { $set: newSample },
      { new: true }
    );
    return res.json(sample);
  } catch (err) {
    console.log(`error occured in sample_controller samplingSurvey ${err}`);
    return res
      .status(401)
      .json({ msg: "error occured in Scheduling a sample" });
  }
};

module.exports.getAllSamples = async (req, res) => {
  try {
    const samples = await Sample.find({ user: req.body.user });
    res.status(200).send(samples);
  } catch (error) {
    console.log(`error occured in sample_controller approvedSamples ${err}`);
    return res
      .status(401)
      .json({ msg: "error occured in fteching approved samples" });
  }
};

module.exports.changeApprovleStatus = async (req, res) => {
  try {
    let sample = await Sample.findById(req.params.id);
    if (!sample) {
      res.send("sample does not exist");
    }
    sample = await Sample.findByIdAndUpdate(req.params.id, {
      approval_status: req.body.approval_status,
    });
    sample = await Sample.findById(req.query.id);
    if (sample) res.send(sample);
  } catch (error) {
    console.log(`error occured in sample_controller changeApprovle ${err}`);
    return res
      .status(401)
      .json({ msg: "error occured in change approvle status of sample" });
  }
};

module.exports.getSampleFromCity = async (req, res) => {
  try {
    const samples = await Sample.find({
      name_of_fso: req.query.name,
      city: req.query.city,
    });
    res.send(samples);
  } catch (err) {
    console.log(`error occured in sample_controller getSampleFromCity ${err}`);
    return res
      .status(401)
      .json({ msg: "error occured in fteching samples from a city for fso" });
  }
};

module.exports.getAllSamples = async (req, res) => {
  try {
    const samples = await Sample.find({ user: req.body.user });
    res.status(200).send(samples);
  } catch (error) {
    console.log(`error occured in sample_controller approvedSamples ${err}`);
    return res
      .status(401)
      .json({ msg: "error occured in fteching approved samples" });
  }
};

module.exports.getSampleFso = async (req, res) => {
  try {
    const samples = await Sample.find({ name_of_fso: req.query.name });
    res.send(samples);
  } catch (err) {
    console.log(`error occured in sample_controller getSampleFso ${err}`);
    return res
      .status(401)
      .json({ msg: "error occured in fteching samples for a fso by name" });
  }
};

module.exports.afterSignature = async (req, res) => {
  try {
    let sample = await Sample.findById(req.params.id);
    if (!sample) {
      res.status(404).json({ msg: "sample does not exist" });
    }
    let signature = await Signature.find({ sample: req.params.id });
    if (signature) {
      res.send("siganture for this sample already exists");
    } else {
      let s3FsoSignUrl = "";
      let s3SiSignUrl = "";

      if ("fso_signature_image" in req.files)
        s3SampleUrl = await s3Upload(req.files.sample_image[0]);
      if ("si_signature_image" in req.files)
        s3LocationeUrl = await s3Upload(req.files.location_image[0]);

      const newSignature = new Signature({
        sample: sample._id,
        fso_signature_image: s3FsoSignUrl,
        si_signature_image: s3SiSignUrl,
      });
      await newSignature.save();
      if (sample) res.json(newSignature);
    }
  } catch (err) {
    console.log(`error occured in sample_controller afterSignature ${err}`);
    return res
      .status(401)
      .json({ msg: "error occured in saving the signature" });
  }
};

module.exports.dataForPdf = async (req, res) => {
  let sample = await Sample.findById(req.params.id);
  let signature = await Signature.find({sample:req.params.id});
  if (!signature) {
    res.send("signature does not exists");
  }
  let result = {
    city: sample.city,
    name_of_fso: sample.name_of_fso,
    sampling_location: sample.sampling_location,
    eureka_sampler: sample.eureka_sampler,
    approval_status: sample.approval_status,
    name_of_sample: sample.name_of_sample,
    outlet_name: sample.outlet_name,
    batch_no: sample.batch_no,
    mfd_date: sample.mfd_date,
    exp_date: sample.exp_date,
    sample_image: sample.sample_image,
    location_image: sample.location_image,
    fso_signature_image:signature[0].fso_signature_image,
    si_signature_image:signature[0].si_signature_image
  }
  if(signature)res.send(result);
};
