/**
 *  1. Server entry point.
 *  2. clustering our server.
 *  3. Calling backend bootstrap file
 */

// assign env variables
require('dotenv').config();

const cluster = require('cluster');
const http = require('http');
const server = require('./server');

// clustering only apply on production server
if (cluster.isMaster && process.env.NODE_ENV === 'production') {
  let cpu_num = require('os').cpus().length;
  for (let i = 0; i < cpu_num; i++) {
    cluster.fork();
  }

  // every time when any child process fail start new process
  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  // http server start runing
  http
    .createServer(server)
    .listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
}
