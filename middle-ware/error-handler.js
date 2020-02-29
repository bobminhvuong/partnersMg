const errorHandler = (err, req, res, next) => {
  res.status(400).json({
    status: 0,
    code: err.code,
    message: err.sqlMessage,
    sql: err.sql
  });
};

module.exports = errorHandler;