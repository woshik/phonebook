exports.asyncController = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};

exports.asyncFuntion = (handler) => {
  return async (...args) => {
    try {
      return await handler(...args);
    } catch (error) {
      throw error;
    }
  };
};
