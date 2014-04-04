'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    _ = require('lodash');


/**
 * Find event by id
 */
exports.event = function(req, res, next, id) {
    Event.load(id, function(err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to load event ' + id));
        req.event = event;
        next();
    });
};

/**
 * Create an event
 */
exports.create = function(req, res) {
    var event = new Event(req.body);

    event.save(function(err) {
        if (err) {
            return err;
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * Update an event
 */
//exports.update = function(req, res) {
//    var event = req.event;
//
//    event = _.extend(event, req.body);
//
//    event.save(function(err) {
//        if (err) {
//            return next(err);
//        } else {
//            res.jsonp(event);
//        }
//    });
//};

/**
 * Delete an event
 */
exports.destroy = function(req, res) {
    var event = req.event;

    event.remove(function(err) {
        if (err) {
            return next(err);
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * Show an event
 */
exports.show = function(req, res) {
    res.jsonp(req.event);
};

/**
 * List of Events
 */
exports.all = function(req, res) {
    Event.find().exec(function(err, events) {
        if (err) {
            return err;
        } else {
            res.jsonp(events);
            Event.remove({}, function (err) {
                if (err) return err;
            });
        }
    });
};
