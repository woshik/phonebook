/**
 * database connection file
 */

const MongoClient = require('mongodb').MongoClient;
const logger = require('../utils/serverErrorLogger');

let _client = null,
  _db = null;

exports.connectWithMogodb = (callback) => {
  MongoClient.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 60000,
    // tls: true,
    poolSize: 100,
  })
    .then((client) => {
      _client = client;
      _db = _client.db(process.env.DB_NAME);
      callback && callback();
    })
    .catch((error) => {
      logger.error({
        label: 'connectWithMogodb',
        message: error.message,
      });
    });
};

exports.getDBClient = () => {
  if (_client) {
    return _client;
  }

  logger.error({
    label: 'getDBClient',
    message: 'database client not found',
  });
};

exports.getDB = () => {
  if (_db) {
    return _db;
  }

  logger.error({
    label: 'getDB',
    message: 'database not found',
  });
};
