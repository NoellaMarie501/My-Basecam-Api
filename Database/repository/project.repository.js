const db = require("../models/connection");
const userModel = require("../models/user.model");
class ProjectRepository {
  //cresting new project
  static async createProject(name, description, projectAdmin) {
    // console.log("ProjectAdmin", ProjectAdmin);
    const user = await db.users.findByPk(projectAdmin);
    if (!user) return "User cannot create project because User does't exists";
    //console.log("projectAdmin", projectAdmin);
    const project = await db.projects.create({
      name,
      description,
      projectAdmin,
      //   user,
    });
    
    if (!project) {
     // console.log("REPOSITORY no Project");
    } else {
      //add the user to the project instance so it updates the Association table
      await project.addUsers(user);
     // console.log("REPOSITORY Project: " + project);
    }
    return project;
  }

  //finding project by id
  static async findProjectById(id) {
    const project = await db.projects.findByPk(id);

    if (!project) {
      return null;
    }
    return project;
  }

  //Associating user to a project
  static async associateUserToProject(UserId, ProjectId) {
    const user = await db.users.findByPk(UserId);
    const project = await this.findProjectById(ProjectId);
    if (!user || !project) {
      return null
    }

    await project.addUsers(user);
    // const associatedUsers = await db.projects.findByPk(ProjectId, {
    //   include: [{ model: db.users, as: "associatedUsers" }]
    // });
    return 1;
  }

//Remove user from project
static async removeUserFromProject(UserId, ProjectId) {
  const user = await db.users.findByPk(UserId);
    const project = await this.findProjectById(ProjectId);
    if (!user || !project) {
      return null
    }

    await project.removeUsers(user);
    // const associatedUsers = await db.projects.findByPk(ProjectId, {
    //   include: [{ model: db.users, as: "associatedUsers" }]
    // });
    return 1;
}

//get associated users to a project
static async getAssociatedUsersToProject(ProjectId){
  const project = await this.findProjectById(ProjectId);
    if (!project) {
      return null
    }
    const associatedUsers = await db.projects.findByPk(ProjectId, {
      include: [{ model: db.users}]
    });
    return associatedUsers;
}


  //updating project
  static async updateProject(id, options) {
    //checking if Project exist first before updating
    const project = await this.findProjectById(id);
    if (!project) {
      return "Project Not found";
    }

    //updating Project with the options
    await db.projects.update(options, {
      where: { id: project.id },
    });

    //getting back the updated Project to be sure it was updated
    const updatedProject = await this.findProjectById(project.id);

    return updatedProject;
  }

  //getting all projects
  static async allProjects() {
    //getting all pojects
    const allProjects = await db.projects.findAll({});

    return allProjects;
  }

  //deleting a project with id
  static async deleteProject(id) {
    const project = await db.projects.findByPk(id);
    if (!project) {
      return null;
    }
    //getting all pojects
    const deletedNUm = await db.projects.destroy({
      where: {
        id: project.id,
      },
    });
    //console.log("del",deletedNUm);
    if (!deletedNUm) {
      return null;
    }
    return deletedNUm;
  }
}

// let noel = ProjectRepository.findProjectById(1);
// console.log(noel);
module.exports = ProjectRepository;
