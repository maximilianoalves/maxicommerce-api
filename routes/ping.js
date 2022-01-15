const express = require('express');
const router  = express.Router();

/**
 * @api {get} ping HealthCheck
 * @apiName Ping
 * @apiGroup Ping
 * @apiVersion 1.0.0
 * @apiDescription A simple health check endpoint to confirm whether the API is up and running.
 * @apiExample Ping server:
 * curl --location --request GET 'localhost:3001/ping'
 * @apiSuccess {String} OK Default HTTP 200 response
 * @apiSuccessExample {json} Response:
 * HTTP/1.1 200 Ok
 * {
    "ping": "ok"
}
 */
// GET
router.get('/', function(req, res, next) {
  res.status(200).send({"ping": "ok"});
});

module.exports = router;