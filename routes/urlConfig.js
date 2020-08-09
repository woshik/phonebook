'use strict';
/**
 * automated api router mapping
 */

const express = require('express');
const { resolve } = require('path');
const router = express.Router();

module.exports = (api, appDIR) => {
  Object.entries(api).forEach(([name, routeInfo]) => {
    Object.entries(routeInfo.methods).forEach(([method, httpVerb]) => {
      const middleware = routeInfo.middleware || [];
      const path = routeInfo.path || '';
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //											                               Route Mapping Debug Method
      // console.log(routeInfo.url, middleware, require(`${appDIR}/application/controller/${path}/${routeInfo.controller}`)[method] )
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      router[httpVerb](
        routeInfo.url,
        middleware,
        require(resolve(`${appDIR}/application/controller/${path}/${routeInfo.controller}`))[method]
      );
    });
  });

  return router;
};
