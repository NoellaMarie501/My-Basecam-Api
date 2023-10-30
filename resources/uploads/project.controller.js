const express = require("express");
const app = express();
const ProjectService = require("../services/projects.service");
const ProjectRepository = require("../../Database/repository/project.repository");

//Getting all projects
app.get("/all", async function (req, res) {
  const projects = await ProjectService.Projects();

  res.send(projects);
});

//getting a project with id
app.get("/:id", async function (req, res) {
  let id = req.params.id;
  const project = await ProjectService.GetProject(id);
  res.send(project);
});

//Posting or creating a project
app.post("/new_project", async function (req, res) {
  let name = req.body.name;
  let description = req.body.description;
  let UserId = req.body.UserId;
  //console.log("req.body",req.body)
  const Project = await ProjectService.createProject(name, description, UserId);
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
