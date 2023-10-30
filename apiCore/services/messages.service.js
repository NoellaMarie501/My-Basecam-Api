const { MessageRepository } = require("../../Database/export_classes");
const { HTTP_STATUS } = require("../../constants");

class MessageService {
  //Method to create a new message
  static async createMessage(content, ThreadId, UserId) {
    const message = await MessageRepository.createMessage(content, ThreadId, UserId
    );
    if (!message) {
        return {
          message: "Couldn't CReate message",
          status: HTTP_STATUS.BAD_REQUEST,
        };
      }
      return {
        message: "Message Created Successfully",
        status: HTTP_STATUS.OK,
        data: message,
      };
  }

  //method to update message
  static async updateMessage(id, options) {
    const message = await MessageRepository.updateMessage(id, options);
    if (!message) {
        return {
          message: "Couldn't update message",
          status: HTTP_STATUS.BAD_REQUEST,
        };
      }
      return {
        message: "Message Updated Successfully",
        status: HTTP_STATUS.OK,
        data: message,
      };
  }

  //Method to get a message with id
  static async getMessage(id) {
    const message = await MessageRepository.findMessageById(id);
    if (!message) {
        return {
          message: "Couldn't get message",
          status: HTTP_STATUS.BAD_REQUEST,
        };
      }
      return {
        status: HTTP_STATUS.OK,
        data: message,
      };
  }

  //getting all messages
  static async messages() {
    const messages = await MessageRepository.allmessages();
    if (!messages) {
        return {
            message : "Could Not Get Messages",
          status: HTTP_STATUS.BAD_REQUEST,
        };
      }
      return {
        status: HTTP_STATUS.OK,
        data: messages,
      };
  }

  //getting messages for a thread
  static async getMessagesByThread(ThreadId) {
    const messages = await MessageRepository.getMessagesByThread(ThreadId);
    if (!messages) {
        return {
          message: "Couldn't create thread",
          status: HTTP_STATUS.BAD_REQUEST,
        };
      }
      return {
        message: "Thread Created Successfully",
        status: HTTP_STATUS.OK,
        data: messages,
      };
  }

  //deleting a message with id
  static async deleteMessage(id) {
    const messages = await MessageRepository.deleteMessage(id);
    if (!messages) {
        return {
          message: "Couldn't delete message",
          status: HTTP_STATUS.BAD_REQUEST,
        };
      }
      return {
        message: "Message Deleted Successfully",
        status: HTTP_STATUS.OK,
        data: messages,
      };
  }
}

module.exports = MessageService;
