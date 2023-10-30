const express = require("express");
const app = express();
const uploadFileMiddleware = require("../middleware/uploads");
const { responseHandler } = require("../utils/responseHandler");
const AttachmentService = require("../services/attachment.service");
const { errorHandler } = require("../utils/errorHandler");
const  checkProject  = require("../middleware/checkProject");
const { __basedir, PATH, HTTP_STATUS } = require("../../constants");

app.post("/uploads", checkProject, uploadFileMiddleware, async function (req, res) {
  //console.log("Uploading")
  const file = req.file;
  //console.log("uploading file", file);

  if (!file) {
    return responseHandler({
      res,
      status: HTTP_STATUS.BAD_REQUEST,
      message: "Please upload a file!",
    });
  }
  try {
    // Everything went fine with upload then create new upload details in database
    const ProjectId = req.query.ProjectId;
    //console.log("ProjectId", ProjectId);
    const filename = file.originalname;
    const path = file.path;
    //console.log("ProjectId, filename, path", ProjectId, filename, path);
    const attachement = await AttachmentService.createAttachment(
      filename,
      path,
      ProjectId
    );
    if(!attachement) {
      return responseHandler({
        res,
        status: HTTP_STATUS.PARTIAL_CONTENT,
        message: "File uploaded but not created Possibility : attachment exists"
      });
    }
    return responseHandler({
      res,
      status: HTTP_STATUS.OK,
      data : attachement,
      message: "File uploaded and created successfully",
    });
  } catch (error) {
    return errorHandler(req, res, error);
  }
});

//deleteing an uploaded file
app.delete("/delete", async function (req, res) {
  const filename = req.query.filename;
  const id = req.query.id;
 // console.log("filename: " + filename);
  const path = __basedir + PATH + filename;
  //console.log("path: " + path);
  const response = await AttachmentService.deleteAttachment(filename, path, id);
  responseHandler({ ...response, res });
});

//getting All Attachments for one project
app.get("/", checkProject, async function (req, res) {
  const ProjectId = req.query.ProjectId;

  const response = await AttachmentService.attachmentsProject(ProjectId)
  responseHandler({...response, res });
});


//getting(Downloading) an Attachment of a project
app.get('/download/:filename',  async function (req, res) {
  const filename = req.params.filename;
  const id = req.query.id;
  const attachment = await AttachmentService.getAttachment(id)
  if(!attachment){
    return responseHandler({message:"Attachment does not exist", error: "Could not Download attachment", status: HTTP_STATUS.BAD_REQUEST, res })
  }
  const filePath = attachment.path;
  res.download(filePath);
});


module.exports = app;
