const multer = require('multer');
const { HTTP_STATUS } = require('../../constants');
const {responseHandler} = require('./responseHandler')
exports.errorHandler = (req, res, error) => {
    if (error instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return responseHandler({
        res,
        status: HTTP_STATUS.BAD_REQUEST,
        message: `A multer error occurred while uploading the file ${req.file.originalname}`,
        error: error
      });
    } else if (error) {
      // An unknown error occurred when uploading.
      //console.log("error: " + error);
      return responseHandler({
        res,
        status: HTTP_STATUS.BAD_REQUEST,
        message: `An error occurred while uploading the file ${req.file.originalname}`,
        error: error
      });
    }

};