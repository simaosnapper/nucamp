const express = require('express');
const bodyParser = require('body-parser');

const partnersRouter = express.Router();

partnersRouter.use(bodyParser.json());

partnersRouter.route('/')
.all((_, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((_, res) => {
    res.end('Will send all the partners to you');
})
.post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
})
.put((_, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})
.delete((_, res) => {
    res.end('Deleting all partners');
});

partnersRouter.route('/:partnerId')
.all((_, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the promotion ${req.params.partnerId} to you.`);
})
.post((_, res) => {
    res.end(`Post not supported`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`Will update the partner ${req.params.partnerId} with name: ${req.body.name} and description: ${req.body.description}.`);
})
.delete((req, res) => {
    res.end(`Deleting the partner ${req.params.partnerId}`);
});

module.exports = partnersRouter;