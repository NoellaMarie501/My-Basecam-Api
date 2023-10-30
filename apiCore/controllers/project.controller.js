const express = require("express");
const app = express();
const ProjectService = require("../services/projects.service");
const { responseHandler } = require("../utils/responseHandler");

//Getting all projects
app.get("/all", async function (req, res) {
  const projects = await ProjectService.Projects();

  res.send(projects);
});

//getting a project with id
app.get("/:id", async function (req, res) {
  let id = req.params.id;
  const project = await ProjectService.ProjectWithAssociatedUsers(id);
  res.send(project);
});

//Associating a user to a project
app.post('/associate/:projectId/users', async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;
  const response = await ProjectService.associateUserToProject(userId, projectId);
  return responseHandler({ ...response, res })
});

// Remove a user from a project
app.delete('/remove/:projectId/users/:userId', async (req, res) => {
  const { projectId, userId } = req.params;
  const response = await ProjectService.removeUserFromProject(userId, projectId)

  return res.status(200).json({ message: 'User removed from project' });

});


//Posting or creating a project
app.post("/new_project", async function (req, res) {
  //console.log(req.body);
  let name = req.body.name;
  let description = req.body.description;
  let projectAdmin = req.body.projectAdmin;
  
  //console.log("req.body",req.body)
  const Project = await ProjectService.createProject(name, description, projectAdmin);
  res.status(200).send(Project);
});

//updating a project
app.put("/update/:id", async function (req, res) {
  let id = req.params.id;
  let options = req.body;
  const project = await ProjectService.UpdateProject(id, options);
  res.send(project);
});

//deleting a project
app.delete("/delete/:id", async function (req, res) {
  let id = req.params.id;
  const project = await ProjectService.DeleteProject(id);
  if (project) res.status(200).send("deleted project successfully!!");
  else res.status(404).send("no project found nor deleted");
});

module.exports = app;
