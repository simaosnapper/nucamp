const express = require('express');
const bodyParser = require('body-parser');

const campsiteRouter = express.Router();

campsiteRouter.use(bodyParser.json());

campsiteRouter.route('/')
.all((_, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((_, res) => {
    res.end('Will send all the campsites to you');
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((_, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete((_, res) => {
    res.end('Deleting all campsites');
});

campsiteRouter.route('/:campsiteId')
.all((_, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the campsite ${req.params.campsiteId} to you.`);
})
.post((_, res) => {
    res.end(`Post not supported`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`Will update the campsite ${req.params.campsiteId} with name: ${req.body.name} and description: ${req.body.description}.`);
})
.delete((req, res) => {
    res.end(`Deleting the campsite ${req.params.campsiteId}`);
});

module.exports = campsiteRouter;