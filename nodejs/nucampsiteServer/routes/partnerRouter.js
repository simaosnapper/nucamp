const express = require('express');
const bodyParser = require('body-parser');
const Partner = require('../models/partner');
const authenticate = require('../authenticate');
const partnersRouter = express.Router();

partnersRouter.use(bodyParser.json());

partnersRouter.route('/')
.get((req, res, next) => {
    Partner.find()
        .then(partners => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(partners);
        })
        .catch(err => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.create(req.body)
        .then(partner => {
            console.log('Partner Created', partner);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(partner);
        })
        .catch(err => next(err));
})
.put(authenticate.verifyUser, (_, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.deleteMany()
        .then(response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
        .catch(err => next(err));
});

partnersRouter.route('/:partnerId')
.get((req, res, next) => {
    Partner.findById(req.params.partnerId)
        .then(partner => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(partner);
        })
        .catch(err => next(err));
})
.post(authenticate.verifyUser, (_, res) => {
    res.end(`Post not supported`);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.findByIdAndUpdate(req.params.partnerId, { $set: req.body }, { new: true })
        .then(partner => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(partner);
        })
        .catch(err => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnerId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = partnersRouter;