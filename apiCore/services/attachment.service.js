const { AttachmentRepository } = require("../../Database/export_classes");
const fs = require("fs");
const { responseHandler } = require("../utils/responseHandler");
const { HTTP_STATUS } = require("../../constants");
class AttachmentService {
  //Method to create a new attachment
  static async createAttachment(filename, path, ProjectId) {
    const attachmentFileName =
      await AttachmentRepository.findAttachmentByFilename(filename);
    //console.log("attachmentFileName", attachmentFileName);
    //console.log("ProjectId",ProjectId);

    if (attachmentFileName) {
      //console.log("inside dont create ");
      let value = false;
      attachmentFileName.forEach((attachhment) => {
        if (ProjectId == attachhment.ProjectId) {
          //console.log("dont create ");
          value = true;
        }
      });
      //console.log("value", value)
      if (value) return null;
    }
    // console.log("create");
    const attachment = await AttachmentRepository.createAttachment(
      filename,
      path,
      ProjectId
    );
    //console.log("attachment",attachment);
    return attachment;
  }

  //Method to get an attachment with id
  static async getAttachment(id) {
    const attachment = await AttachmentRepository.findAttachmentById(id);
    if (!attachment) {
      return null;
    }
    //console.log("attachment",attachment)
    return attachment;
  }

  //getting attachments for a particular project
  static async attachmentsProject(ProjectId) {
    const attachmentsProject = await AttachmentRepository.attachementsProject(
      ProjectId
    );
    if (!attachmentsProject) {
      return {
        message: "No attachments for this project",
        data: null,
        status: HTTP_STATUS.BAD_REQUEST,
        error: "No Attachments Found for this project",
      };
    }

    return { data: attachmentsProject, message: "Success!!" };
  }

  //getting all attachments
  static async attachments() {
    const attachments = await AttachmentRepository.allAttachments();
    if (!attachments) {
      return "attachments not found";
    }
    //console.log("attachment",attachments)
    return attachments;
  }

  //deleting a attachment with id
  static async deleteAttachment(filename, path, id) {
    //checking if the attachment exists
    const attachments = await AttachmentRepository.findAttachmentById(id);
    //console.log("id", id);

    //if no attachments exist
    if (!attachments) {
      //console.log("none");
      return {
        status: HTTP_STATUS.NOT_FOUND,
        message: `No attachment deleted because file ${filename} not Found`,
      };
    }

    //if attachment exists then delete(offload) it using fs module
    try {
      //check if this file belongs just to one project if yes you can offload if not just delete its attachment
      const files = await AttachmentRepository.findAttachmentByFilename(
        filename
      );
      //console.log(files)
      if (files.length > 1) {
      //  console.log("sup");
        //if no error then delete record from the database
        const deletedAttachments = await AttachmentRepository.deleteAttachment(
          id
        );

        if (!deletedAttachments) {
          return {
            status: HTTP_STATUS.PARTIAL_CONTENT,
            message: `File ${filename} Offloaded But Not Deleted `,
            error: error,
          };
        }
        // console.log("attachment",attachments)
        return {
          message: `File ${filename} Offloaded Successfully `,
          data: deletedAttachments,
        };
      } else if (files.length == 1) {
        // console.log(files)
        fs.unlink(path, function (error) {
          if (error) {
            return {
              status: HTTP_STATUS.BAD_REQUEST,
              message: `Error Offloading file ${filename}`,
              error: error,
            };
          }
        });

        //if no error then delete record from the database
        const deletedAttachments = await AttachmentRepository.deleteAttachment(
          id
        );

        if (!deletedAttachments) {
          return {
            status: HTTP_STATUS.PARTIAL_CONTENT,
            message: `File ${filename} Offloaded But Not Deleted `,
            error: error,
          };
        }
        // console.log("attachment",attachments)
        return {
          message: `File ${filename} Offloaded Successfully `,
          data: deletedAttachments,
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS.BAD_REQUEST,
        message: `File ${filename} Not Ofloaded Nor Deleted `,
        error: error,
      };
    }
  }
}

module.exports = AttachmentService;
