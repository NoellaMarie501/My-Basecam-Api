const express = require("express");
const app = express();
const MessageService = require("../services/messages.service");
const { responseHandler } = require("../utils/responseHandler");

//Getting all messages
app.get("/all", async function (req, res) {
  const messages = await MessageService.messages();

  return responseHandler({...messages, res});
});

//Getting all messages by a Thread
app.get("/:ThreadId", async function (req, res) {
  const ThreadId = req.params.ThreadId
  const messages = await MessageService.getMessagesByThread(ThreadId);

  return responseHandler({...messages, res});
});

//getting a message with id
app.get("/get_message/:id", async function (req, res) {

  let id = req.params.id;
  
  //console.log("id", id)
  const message = await MessageService.getMessage(id);
  return responseHandler({...message, res});
});

//Posting or creating a message
app.post("/new_message", async function (req, res) {
 const content = req.body.content;
 const ThreadId = req.body.ThreadId;
 const UserId = req.body.UserId;
  //console.log("req.body",req.body)
  const message = await MessageService.createMessage(content, ThreadId, UserId);
  return responseHandler({...message, res});
});

//updating a message
app.put("/update/:id", async function (req, res) {
  let id = req.params.id;
  let options = req.body;
  const message = await MessageService.updateMessage(id, options);
  return responseHandler({...message, res});
});

//deleting a message
app.delete("/delete/:id", async function (req, res) {
  let id = req.params.id;
  const message = await MessageService.deleteMessage(id);
  return responseHandler({...message, res})
});

module.exports = app;
