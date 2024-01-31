const { errorsMessages } = require('../constants/errorsMessages');

const globalErr = (err, req, res, next) => {
  // if the error has no status, we set 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // check the status and send a message depending on it
      message: statusCode === 500
        ? errorsMessages.globalError
        : message,
    });

  next();
};

module.exports = globalErr;
