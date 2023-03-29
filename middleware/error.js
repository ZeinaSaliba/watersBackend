const logger = require("../logger");
// Export error handling middleware function
module.exports = function (err, req, res, next) {
  // Determine the HTTP status code and error message to return
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  logger.info(err);
  // Send an HTTP response with the status code, error message, and any additional data
  res.status(status).json({ message: message, data: data });
};
