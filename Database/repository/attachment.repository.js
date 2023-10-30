const { responseHandler } = require("../../apiCore/utils/responseHandler");
const { HTTP_STATUS } = require("../../constants");
const db = require("../models/connection");

class AttachmentRepository {
  //creating new attachment
  static async createAttachment(filename, path, ProjectId) {
    //console.log("repo")
    const attachment = await db.attachments.create({
      filename,
      path,
      ProjectId: ProjectId,
    });
    //console.log("attachment",attachment);
    if (!attachment) {
     // console.log("REPOSITORY no attachment created");
    } else {
     // console.log("REPOSITORY attachment: " + attachment);
    }
    return attachment;
  }

  //finding attachment by id
  static async findAttachmentById(id) {
    const attachement = await db.attachments.findByPk(id);

    if (!attachement) {
      return "Attachment Not found";
    }
    return attachement;
  }

  //finding all attachments for a particular project
  static async attachementsProject(ProjectId) {
    const attachementsProject = await db.attachments.findAll({
      where: { ProjectId: ProjectId },
    });
    if(!attachementsProject.length){
        return null;
    }
    return attachementsProject;
  }

  //getting all projects
  static async allAttachments() {
    //getting all attachments
    const allAttachments = await db.attachments.findAll({});

    return allAttachments;
  }

  //find attachment by filename
  static async findAttachmentByFilename(filename) {
    const attachement = await db.attachments.findAll({where :{filename : filename}});
   // console.log(attachement)
    if (!attachement.length) {
      
      return null;
    }
    return attachement
  }


  //deleting an attachment with id
  static async deleteAttachment(id) {
    const attachement = await this.findAttachmentById(id);
    
    if (!attachement) {
      return null;
    }
    //getting all attachments
    const deletedNUm = await db.attachments.destroy({
      where: {
        id: attachement.id,
      },
    });
    //console.log("del",deletedNUm);
    if (!deletedNUm) {
      return null;
    }
    return deletedNUm;
  }
}

module.exports = AttachmentRepository;
