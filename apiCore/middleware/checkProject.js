const { ProjectRepository } = require("../../Database/export_classes");
const { responseHandler } = require("../utils/responseHandler");
const { HTTP_STATUS } = require("../../constants");

const checkProject = async (req, res, next) => {
  const ProjectId = req.query.ProjectId;
  //console.log(req)
  const project = await ProjectRepository.findProjectById(ProjectId);
  //console.log(project)
  if (!project) {
    return responseHandler({
      res,
      status: HTTP_STATUS.UNAUTHORIZED,
      message:
        "Project does not exist",
      error : "No Project Was Found"
    });
  }
  next();
};

module.exports = checkProject;
