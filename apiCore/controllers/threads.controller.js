const express = require("express");
const app = express();
const ThreadService = require("../services/thread.service");
const { responseHandler } = require("../utils/responseHandler");

//Getting all Threads
app.get("/all", async function (req, res) {
  const Threads = await ThreadService.getThreads();
  return responseHandler(...Threads, res)
});


//getting thread for a project
app.get("/", async function (req, res) {
  const ProjectId = req.query.ProjectId

  const Threads = await ThreadService.getProjectThreads(ProjectId);
  return responseHandler({...Threads, res})
});


//getting a Thread with id
app.get("/:id", async function (req, res) {
  let id = req.params.id;
  const Thread = await ThreadService.getThreadById(id);
  return responseHandler({...Thread, res})
});

//Posting or creating a Thread
app.post("/new_thread/:ProjectId", async function (req, res) {
  const ProjectId = req.params.ProjectId;
  
  const title = req.body.title;
 // console.log("req.body",req.body)
  const Thread = await ThreadService.createThread(title, ProjectId);
 // console.log(Thread);
  return responseHandler( {...Thread, res})
});

//updating a Threadlet
app.put("/update/:id", async function (req, res) {
  let id = req.params.id;
  let options = req.body;
  //console.log("thread", id);
  const Thread = await ThreadService.updateThread(id, options);
  return responseHandler({...Thread, res});
});

//deleting a Thread
app.delete("/delete/:id", async function (req, res) {
  let id = req.params.id;
  const Thread = await ThreadService.deleteThread(id);
  return responseHandler({...Thread, res})
});

module.exports = app;
