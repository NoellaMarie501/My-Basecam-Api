const express = require("express");
const app = express();
const PORT = 3002;
const host = 'localhost';
const UsersController = require("../apiCore/controllers/users.controller");
const ProjectsController = require("../apiCore/controllers/project.controller");
const AttachmentsController = require("../apiCore/controllers/attachment.controller");
const ThreadsController = require("../apiCore/controllers/threads.controller")
const MessagesController = require("../apiCore/controllers/messages.controller");
const cors = require("cors"); //Cross-Origin Resource Sharing (CORS)
const path = require("path");
//var serveIndex = require("serve-index");


app.use(cors()); //enabling connection from another domain or server such as the front end
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("resources/uploads"));
//app.use('/resources', serveIndex(path.join(__dirname, 'resources/')));
app.use('/resources', express.static(path.join(__dirname, 'resources/')));
app.use("/users", UsersController);
app.use("/projects", ProjectsController);
app.use("/attachments", AttachmentsController);
app.use("/threads", ThreadsController)
app.use("/messages", MessagesController);

app.listen(PORT, host,() => {
 // console.log(`listening on port = ${PORT}`);
});

module.exports = app;
