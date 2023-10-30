const { UserRepository } = require("../../Database/export_classes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret, HTTP_STATUS } = require("../../constants");
class UserService {
  //Create new user
  static async createUser(username, password, firstname, lastname, email) {
    const user = await UserRepository.findUserByEmail(email);
    if (user) {
      return {
        message: "User Already Exists",
        status: HTTP_STATUS.BAD_REQUEST,
        error: "User already exists"
      };
    } else {
      const salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(password, salt);
      //console.log(hashedPassword, salt);
      const newuser = await UserRepository.CreateUser(
        username,
        hashedPassword,
        firstname,
        lastname,
        email
      );
      return { data: newuser, status: HTTP_STATUS.OK };
    }
  }

  //get user with associated projects
  static async getUserWithProjects(UserId){
    const user = await UserRepository.getUserWithProjects(UserId)
  if (!user) {
    return { error: "user not found", status: HTTP_STATUS.BAD_REQUEST, message : "could not get user and associated projects"}
  }
  return {status : HTTP_STATUS.OK, data : user}
  }

  //Update user
  static async UpdateUser(id, options) {
    const user = await UserRepository.updateUser(id, options);
    if (!user) {
      return "user not found";
    }

    //console.log("service user", user);
    return user;
  }

  //Get User
  static async GetUser(id) {
    const user = await UserRepository.findUserByIdNoPwd(id);
    if (!user) {
      return "user not found";
    }

    //console.log("service user", user);
    return user;
  }

  //Getting all users
  static async AllUsers(id) {
    const users = await UserRepository.allUsers(id);
    if (!users) {
      return "users not found";
    }

    //console.log("service user", users);
    return users;
  }

  //Delete User
  static async DeleteUser(id) {
    const user = await UserRepository.deleteUser(id);
    if (!user) {
      return null;
    }

    return user;
  }

  //Sign in
  static async SignIn(email, password) {
    const user = await UserRepository.findUserByEmail(email);

    //check if user email exist
    if (!user) {
      return {
        message: "Wrong Email or password",
        status: HTTP_STATUS.BAD_REQUEST,
      };
    }
    //checking if passwords match
    let matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return {
        message: "Wrong Email or password",
        status: HTTP_STATUS.BAD_REQUEST,
      };
    }

    //Generate a token for the user loging in using user id
    var token = jwt.sign({ id: user.id, role: user.role }, secret);

    user.dataValues.token = token;

    return { data: user, status: HTTP_STATUS.OK };
  }
}
module.exports = UserService;
