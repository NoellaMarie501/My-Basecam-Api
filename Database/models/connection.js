require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");
const db = {};
const databaseName = "if0_37115090_my_basecamp";
const dbDailect = "mysql"
const dbUser = "if0_37115090"
const dbPassword = "SixjbaWd2RM9q"
const host = "sql110.infinityfree.com"
const port = process.env.PORT
// const sequelize = new Sequelize(

//   {
//     dialect: "sqlite",
//     storage: " /home/jorelmarc/my_basecamp.db",
//   }
// );

const sequelize = new Sequelize(databaseName, dbUser, dbPassword, {
  host: host,
  dialect: dbDailect//,
  //port: port
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//calling the model functions to execute table creation
db.users = require("./user.model.js")(sequelize, DataTypes);
db.projects = require("./project.model")(sequelize, DataTypes);
db.attachments = require("./attachements.model.js")(sequelize, DataTypes);
db.threads = require("./threads.model.js")(sequelize, DataTypes);
db.messages = require("./messages.model.js")(sequelize, DataTypes);

//table relations
 //users and projects
 db.users.belongsToMany(db.projects, { through: 'UserProjects'});
 db.projects.belongsToMany(db.users, { through: 'UserProjects'});
 //db.projects.belongsTo(db.users, { foreignKey: 'projectAdmin' });
 
  //projects and attachments
  db.projects.hasMany(db.attachments);
  db.attachments.belongsTo(db.projects, {onDelete : 'cascade'});
  //projects and threads
  db.projects.hasMany(db.threads);
  db.threads.belongsTo(db.projects, {onDelete : 'cascade'});
  //threads and messages
  db.threads.hasMany(db.messages);
  db.messages.belongsTo(db.threads, {onDelete : 'cascade'});
  //messages and users
  db.users.hasMany(db.messages);
  db.messages.belongsTo(db.users, {onDelete : 'cascade'});

//checking if database can connect
sequelize
  .authenticate()
  .then(() => {
   // console.log("== Data Base connection successfull===");
  })
  .catch((err) => {
    //console.log("===Error in Data Base connection : " + err + " ====");
  });

//connecting to database
sequelize
  .sync()
  .then(() => {
   // console.log("== Data Base synchronised===");
  })
  .catch((err) => {
   // console.log("===Error in Data Base synchronisation): " + err + " ====");
  });

module.exports = db;
