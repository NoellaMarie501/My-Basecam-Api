const db = require("../models/connection");
const ThreadModel = require("../models/threads.model");

class MessageRepository {
  //cresting new message
  static async createMessage(content, ThreadId, UserId) {
    const message = await db.messages.create({ content, ThreadId, UserId });
    if (!message) {
      //console.log("REPOSITORY no message");
    } else {
      //console.log("REPOSITORY message: " + message);
    }
    return message;
  }

  //finding message by id
  static async findMessageById(id) {
    const message = await db.messages.findByPk(id);

    if (!message) {
      return null;
    }
    return message;
  }

  //updating message
  static async updateMessage(id, options) {
    //checking if message exist first before updating
    const message = await this.findMessageById(id);
    if (!message) {
      return "message Not found";
    }

    //updating message with the options
    await db.messages.update(options, {
      where: { id: message.id },
    });

    //getting back the updated message to be sure it was updated
    const updatedMessage = await this.findMessageById(message.id);

    return updatedMessage;
  }

  //getting all messages
  static async allMessages() {
    const allmessages = await db.messages.findAll({});

    return allmessages;
  }

  //Getting messages for a Thread
  static async getMessagesByThread(ThreadId) {
    //getting all pojects
    const threadMessages = await db.messages.findAll({
      where: { ThreadId: ThreadId },
    });

    return threadMessages;
  }

  //deleting a message with id
  static async deleteMessage(id) {
    const message = await db.messages.findByPk(id);
    if (!message) {
      return null;
    }
    //getting all pojects
    const deletedNUm = await db.messages.destroy({
      where: {
        id: message.id,
      },
    });
    //console.log("del",deletedNUm);
    if (!deletedNUm) {
      return null;
    }
    return deletedNUm;
  }
}

// let noel = messageRepository.findmessageById(1);
// console.log(noel);
module.exports = MessageRepository;
