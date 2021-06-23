let router = require("express").Router();
let { validateData } = require("../util/validators");
let AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

let s3 = new AWS.S3();

router.post("/saveData", (req, res, next) => {
  let data = req.body;
  console.log(data);
  let validate = validateData(data);

  if (validate.result) {
    let params = {
      Bucket: "mygstbill",
      Body: JSON.stringify(data.data),
      Key: `${data.uid}/data.json`,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        next(err);
      } else {
        res.send({
          result: true,
          msg: "Uploaded successfully",
          data,
        });
      }
    });
  } else {
    res.send({
      result: false,
      msg: "Data validataion failed",
      problems: validate.problems,
    });
  }
});

router.get("/getData/:uid", (req, res, next) => {
  try {
    let uid = req.params.uid;

    let params = {
      Key: `${uid}/data.json`,
      Bucket: "mygstbill",
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        next(err);
      } else {
        res.send({
          data: JSON.parse(Buffer.from(data.Body).toString("utf8")),
          result: true,
          msg: "Got your data successfully",
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
