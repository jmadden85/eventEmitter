'use strict';

// Articles routes use events controller
var events = require('../controllers/events');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.event.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/events', events.all);
    app.post('/events', events.create);
    app.get('/events/:eventId', events.show);
//    app.put('/events/:eventId', authorization.requiresLogin, hasAuthorization, events.update);
    app.del('/events/:eventId', events.destroy);

    // Finish with setting up the eventId param
    app.param('eventId', events.event);

};