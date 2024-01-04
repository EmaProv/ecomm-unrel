const { S3 } = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();
const region = process.env.AWS_REGION;
const keyId = process.env.AWS_ACCESS_KEY_ID;
const sec = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  keyId,
  sec,
});

//meth: POST
//auth: ADMIN
//desc: push to aws bucket imgs
function s3Upload(dir, files) {
  const filesArr = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${dir}/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
    };
  });

  return Promise.all(filesArr.map((param) => s3.upload(param).promise()));
}
exports.s3Upload = s3Upload;

//meth: PUT
//auth: ADMIN
//desc: push to aws bucket files modified
function s3UpdateUpload(dir, files, needPng, needPdf) {
  if (needPng && needPdf) {
    console.log("TUTTO");
    const updFiles = files.map((file) => {
      return {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${dir}/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
      };
    });

    return Promise.all(updFiles.map((param) => s3.upload(param).promise()));
  } else if (needPng && !needPdf) {
    console.log("PNG");

    const updFiles = files.map((file) => {
      const fileExt = file.originalname.split(".")[1];
      if (fileExt.toLowerCase() !== "pdf") {
        return {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${dir}/${Date.now()}_${file.originalname}`,
          Body: file.buffer,
        };
      }
    });

    return Promise.all(updFiles.map((param) => s3.upload(param).promise()));
  } else if (needPdf && !needPng) {
    console.log("PDF");

    const updFiles = files.map((file) => {
      const fileExt = file.originalname.split(".")[1];
      if (fileExt.toLowerCase() !== "png") {
        return {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${dir}/${Date.now()}_${file.originalname}`,
          Body: file.buffer,
        };
      }
    });

    return Promise.all(updFiles.map((param) => s3.upload(param).promise()));
  } else {
    console.log("SOLO JPG");

    const updFiles = files.map((file) => {
      const fileExt = file.originalname.split(".")[1];
      if (fileExt.toLowerCase() !== "png" && fileExt.toLowerCase() !== "pdf") {
        return {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${dir}/${Date.now()}_${file.originalname}`,
          Body: file.buffer,
        };
      }
    });

    return Promise.all(updFiles.map((param) => s3.upload(param).promise()));
  }
}
exports.s3UpdateUpload = s3UpdateUpload;

//meth: DELETE
//auth: ADMIN
//desc: delete aws object from bucket for the entire product
const deleteProdBck = async (slug) => {
  try {
    const listParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: slug,
    };

    const listedObjToDel = await s3
      .listObjectsV2(listParams, function (err, data) {
        if (err) return console.log(err);
      })
      .promise();

    if (listedObjToDel.Contents.length === 0) {
      return console.log("Bucket doesn't exist.");
    }

    const delParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Delete: {
        Objects: [],
      },
    };

    listedObjToDel.Contents.forEach((e) => {
      delParams.Delete.Objects.push({ Key: e.Key });
    });

    await s3
      .deleteObjects(delParams, function (err, data) {
        if (err) return console.log(err);
      })
      .promise();
    if (listedObjToDel.IsTruncated) {
      await deleteProdBck(slug);
    }
  } catch (err) {
    console.log(err);
  }
};
exports.deleteProdBck = deleteProdBck;

//meth: DELETE
//auth: ADMIN
//desc: delete aws object removed after update
const deleteProdFilesAfterUpd = async (slug, filesListToDel) => {
  try {
    const fileObjToDel = [];
    const listParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: slug,
    };

    const listedExistingObj = await s3
      .listObjectsV2(listParams, function (err, data) {
        if (err) return console.log(err);
      })
      .promise();

    if (listedExistingObj.Contents.length === 0) {
      return console.log("Bucket doesn't exist.");
    }

    listedExistingObj.Contents.forEach((f) => {
      if (filesListToDel.includes(f.Key)) {
        fileObjToDel.push(f);
      }
    });

    const delParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Delete: {
        Objects: [],
      },
    };

    fileObjToDel.forEach((e) => {
      delParams.Delete.Objects.push({ Key: e.Key });
    });

    await s3
      .deleteObjects(delParams, function (err, data) {
        if (err) return console.log(err);
      })
      .promise();

    if (listedExistingObj.IsTruncated) {
      await deleteProdFilesAfterUpd(slug, filesListToDel);
    }
  } catch (err) {
    console.log(err);
  }
};
exports.deleteProdFilesAfterUpd = deleteProdFilesAfterUpd;
