const { ProjectRepository } = require("../../Database/export_classes");
const { HTTP_STATUS } = require("../../constants");

class ProjectService {
  //Method to create a new project
  static async createProject(name, description, projectAdmin) {
    
    const Project = await ProjectRepository.createProject(
      name,
      description,
      projectAdmin
    );
    return Project;
  }

  //method to associate a user to a project
  static async associateUserToProject(ProjectId, UserId) {
    const associatedUsers = await ProjectRepository.associateUserToProject(ProjectId, UserId);
    if (!associatedUsers) {
      return {
        error: "User or Project Not Found",
        status: HTTP_STATUS.BAD_REQUEST,
        message: "User could not be associated to project"
      };
    }
    return {
      status: HTTP_STATUS.OK,
      message: "User Associated to project",
      data: associatedUsers
    };
  }
  //Method to remove a user from a project
  static async removeUserFromProject(ProjectId, UserId) {
    const removedUsers = await ProjectRepository.removeUserFromProject(ProjectId, UserId);
    if (!removedUsers) {
      return { error: "User or Project Not Found", status: HTTP_STATUS.BAD_REQUEST, message: "Could not remove user from project" };
    }
    return {data: removedUsers, status: HTTP_STATUS.OK, message: "User removed from project succesfully"}
  }
  //method to update project
  static async UpdateProject(id, options) {
    const project = await ProjectRepository.updateProject(id, options);
    if (!project) {
      return "Project not found";
    }

    return project;
  }
 //Get project with associated users
 static async ProjectWithAssociatedUsers(ProjectId){
  const projects = await ProjectRepository.getAssociatedUsersToProject(ProjectId)
  if (!projects) {
    return { error: "Project not found", status: HTTP_STATUS.BAD_REQUEST, message : "could not get project and associated users"}
  }
  return {status : HTTP_STATUS.OK, data : projects}
 }
  //Method to get a project with id
  static async GetProject(id) {
    const project = await ProjectRepository.findProjectById(id);
    if (!project) {
      return "Project not found";
    }
    //console.log("project",project)
    return project;
  }

  //getting all projects
  static async Projects() {
    const projects = await ProjectRepository.allProjects();
    if (!projects) {
      return "Projects not found";
    }
    //console.log("project",projects)
    return projects;
  }

  //deleting a project with id
  static async DeleteProject(id) {
    const projects = await ProjectRepository.deleteProject(id);
    if (!projects) {
      return null;
    }
    // console.log("project",projects)
    return projects;
  }
}

module.exports = ProjectService;
