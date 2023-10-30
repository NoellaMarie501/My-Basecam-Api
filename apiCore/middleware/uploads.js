const util = require("util");
const multer = require("multer");
const { __basedir, PATH } = require("../../constants");
const maxFileSize = 2 * (1024 * 1024); //2mb


//creating a storage engine for uploading file
const storage = multer.diskStorage({
  //specifying file destination path
  destination: (req, file, callback) => {
    callback(null, __basedir + PATH);
  },
  //specifying filename using the original file name
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

//uploadfile function specifying the storage engine and file size limit
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxFileSize },
}).single("file");//nnote file is the name of element in html


//converting uploadfile function to a promise type function with async and await
let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
