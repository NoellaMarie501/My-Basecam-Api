const { ThreadsRepository } = require("../../Database/export_classes");
const { HTTP_STATUS } = require("../../constants");

class ThreadService {
  //creatting new thread
  static async createThread(title, ProjectId) {
    const thread = await ThreadsRepository.creatThread(title, ProjectId);

    if (!thread) {
      return {
        message: "Couldn't create thread",
        status: HTTP_STATUS.BAD_REQUEST,
      };
    }
    return {
      message: "Thread Created Successfully",
      status: HTTP_STATUS.OK,
      data: thread,
    };
  }
  //updating thread
  static async updateThread(id, options) {
    const updated = await ThreadsRepository.updateThread(id, options);
    if (!updated) {
      return {
        message: "Couldn't Update thread",
        status: HTTP_STATUS.BAD_REQUEST,
      };
    }
    return {
      message: "Thread Updated Successfully",
      status: HTTP_STATUS.OK,
      data: updated,
    };
  }
  //deleting a thread
  static async deleteThread(id) {
    const deleted = await ThreadsRepository.deleteThread(id);
    if (!deleted) {
      return {
        message: "Couldn't Update thread",
        status: HTTP_STATUS.BAD_REQUEST,
      };
    }
    return {
      message: "Thread Deleted Successfully",
      status: HTTP_STATUS.OK,
      data: deleted,
    };
  }
  //getting all threads
  static async getThreads() {
    const threads = await ThreadsRepository.getThreads();
    if (!threads) {
      return { message: "No Thread Found", status: HTTP_STATUS.BAD_REQUEST };
    }
    return { status: HTTP_STATUS.OK, data: threads };
  }
  //getting threads for a project
  static async getProjectThreads(ProjectId) {
    const projectThreads = await ThreadsRepository.projectThreads(ProjectId);
    //console.log(projectThreads);
    if (!projectThreads) {
      return {
        message: "Couldn't Update thread",
        status: HTTP_STATUS.BAD_REQUEST,
      };
    }
    return { status: HTTP_STATUS.OK, data: projectThreads };
  }
  //getting a thread by id
  static async getThreadById(id) {
    const thread = await ThreadsRepository.findThreadById(id);
    if (!thread) {
      return {
        message: "Couldn't Update thread",
        status: HTTP_STATUS.BAD_REQUEST,
      };
    }
    return { status: HTTP_STATUS.OK, data: thread };
  }
  //getting a thread by title
  static async getThreadByTitle(title) {
    const thread = await ThreadsRepository.findThreadByTitle(title);
    if (!thread) {
      return {
        message: "Couldn't Update thread",
        status: HTTP_STATUS.BAD_REQUEST,
      };
    }
    return { status: HTTP_STATUS.OK, data: thread };
  }
}

module.exports = ThreadService;
