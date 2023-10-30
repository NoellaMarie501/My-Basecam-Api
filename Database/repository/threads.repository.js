const db = require("../models/connection");
const projectModel = require("../models/project.model");

class ThreadRepository {
  //cresting new thread
  static async creatThread(title, ProjectId) {
    // // console.log("ProjectId", ProjectId);
    // const project = await db.projects.findByPk(ProjectId);
    // if (!project) return "cannot create thread because project does't exists";

    const thread = await db.threads.create({
      title,
      ProjectId: ProjectId,
    });
    if (!thread) {
     // console.log("REPOSITORY no thread");
    } else {
      //console.log("REPOSITORY thread: " + thread);
    }
    return thread;
  }

  //finding thread by id
  static async findThreadById(id) {
    const thread = await db.threads.findByPk(id);

    if (!thread) {
      return null;
    }
    return thread;
  }

  //finding thread by title
  static async findThreadByTitle(title) {
    const thread = await db.threads.findOne({ where: { title: title } });

    if (!thread) {
      return null;
    }
    return thread;
  }

  //updating thread
  static async updateThread(id, options) {
    //checking if thread exist first before updating
    const thread = await this.findThreadById(id);
    if (!thread) {
      return "thread Not found";
    }

    //updating thread with the options
    await db.threads.update(options, {
      where: { id: thread.id },
    });

    //getting back the updated thread to be sure it was updated
    const updatedthread = await this.findThreadById(thread.id);

    return updatedthread;
  }

  //getting all threads
  static async allthreads() {
    const allthreads = await db.threads.findAll({});

    return allthreads;
  }

  //Getting threads for a project
  static async projectThreads(ProjectId) {
    //getting all pojects
    const projectThreads = await db.threads.findAll({
      where: { ProjectId: ProjectId },
    });
    
    return projectThreads;
  }

  //deleting a thread with id
  static async deleteThread(id) {
    const thread = await db.threads.findByPk(id);
    if (!thread) {
      return null;
    }
    //getting all pojects
    const deletedNUm = await db.threads.destroy({
      where: {
        id: thread.id,
      },
    });
    //console.log("del",deletedNUm);
    if (!deletedNUm) {
      return null;
    }
    return deletedNUm;
  }
}

// let noel = threadRepository.findthreadById(1);
// console.log(noel);
module.exports = ThreadRepository;
