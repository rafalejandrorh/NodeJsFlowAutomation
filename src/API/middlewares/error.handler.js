const { ValidationError } = require('sequelize');

function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}

function httpErrorHandler(err, req, res, next) {
  isHttpError = err.response.status !== 200 ? true : false;
  statusCode = err.response.status;
  statusText = err.response.statusText;
  statusDescription = err.response.data.message;

  if(isHttpError) {
    res.status(statusCode).json({
      statusCode: statusCode,
      message: statusText,
      errors: statusDescription
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler, httpErrorHandler }
