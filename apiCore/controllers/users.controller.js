const express = require("express");
const app = express();
const UserService = require("../services/users.service");
const { verifyToken, checkRole } = require("../middleware/control");
const { responseHandler } = require("../utils/responseHandler");

//getting all users
app.get("/all", verifyToken, async function (req, res) {
  //console.log('users:', users);
  let users = await UserService.AllUsers();

  res.send(users);
});

//User SignIn
app.post("/signin", async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  //console.log("password", password);
  const response = await UserService.SignIn(email, password);
  //console.log(user)
  responseHandler({ ...response, res });
});

//getting a user with id
app.get("/:id", async function (req, res) {
  let id = req.params.id;
  let response = await UserService.getUserWithProjects(id);
  responseHandler({ ...response, res });
});

//posting or creating a user
app.post("/register", async function (req, res) {
  const { username, password, firstname, lastname, email } = req.body;
  const response = await UserService.createUser(
    username,
    password,
    firstname,
    lastname,
    email
  );
 // console.log(user);
 responseHandler({ ...response, res });
});

//Updating a user
app.put("/update/:id", async function (req, res) {
  let id = req.params.id;
  let options = req.body;

  const user = await UserService.UpdateUser(id, options);

  res.send(user);
});

//deleting a User
app.delete("/delete/:id", async function (req, res) {
  let id = req.params.id;
  // console.log('delete id', id);
  const user = await UserService.DeleteUser(id);
  if (user) res.status(200).send("deleted User successfully");
  else res.status(404).send("No user found nor deleted");
});

module.exports = app;
