const express = require('express');
const bodyParser = require('body-parser');

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
.all((_, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((_, res) => {
    res.end('Will send all the promotions to you');
})
.post((req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
})
.put((_, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((_, res) => {
    res.end('Deleting all promotions');
});

promotionsRouter.route('/:promotionId')
.all((_, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the promotion ${req.params.promotionId} to you.`);
})
.post((_, res) => {
    res.end(`Post not supported`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`Will update the promotion ${req.params.promotionId} with name: ${req.body.name} and description: ${req.body.description}.`);
})
.delete((req, res) => {
    res.end(`Deleting the promotion ${req.params.promotionId}`);
});

module.exports = promotionsRouter;