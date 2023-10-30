exports.responseHandler = ({
  res,
  status = 200,
  data = null,
  message = "",
  error = "No error"
}) => {
  return res.status(status).json({
    status,
    data,
    message,
    error
  });
};
