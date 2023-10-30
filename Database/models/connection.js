require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");
const db = {};
const databaseName = process.env.DATABASE;
const dbDailect = process.env.DB_DIALECT
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const host = process.env.HOST
// const sequelize = new Sequelize(

//   {
//     dialect: "sqlite",
//     storage: " /home/jorelmarc/my_basecamp.db",
//   }
// );

const sequelize = new Sequelize(databaseName, dbUser, dbPassword, {
  host: host,
  dialect: dbDailect,
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
