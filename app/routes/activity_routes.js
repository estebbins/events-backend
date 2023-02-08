// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Event = require('../models/event')

// custom middleware
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// ROUTES

// POST -> create a activity(and give that activity to a event)
// POST /activities/:eventId
// anybody should be able to give a event a activity
// so we wont requireToken
// our activity schema, has some non-required fields, so let's use removeBlanks
router.post('/activities/:eventId', removeBlanks, (req, res, next) => {
    // isolate our activity from the request, and save to variable
    const activity = req.body.activity
    // isolate and save our event's id for easy reference
    const eventId = req.params.eventId
    // find the event and push the new activity into the event's array
    Event.findById(eventId)
        // first step is to use our custom 404 middleware
        .then(handle404)
        // handle adding activity to event
        .then(event => {
            console.log('the event: ', event)
            console.log('the activity: ', activity)
            // add activity to activities array
            event.activities.push(activity)

            // save the event
            return event.save()
        })
        // send info after updating the event
        .then(event => res.status(201).json({ event: event }))
        // pass errors along to our error handler
        .catch(next)
})

// PATCH -> update a activity
// PATCH /activities/:eventId/:activityId
router.patch('/activities/:eventId/:activityId', requireToken, removeBlanks, (req, res, next) => {
    // get and save the id's to variables
    const eventId = req.params.eventId
    const activityId = req.params.activityId

    // find our event
    Event.findById(eventId)
        .then(handle404)
        .then(event => {
            // single out the activity
            const theActivity = event.activities.id(activityId)
            // make sure the user is the event's owner
            requireOwnership(req, event)
            // update accordingly
            theActivity.set(req.body.activity)

            return event.save()
        })
        // send a status
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE -> destroy a activity
// DELETE /activities/:eventId/:activityId
router.delete('/activities/:eventId/:activityId', requireToken, (req, res, next) => {
    const eventId = req.params.eventId
    const activityId = req.params.activityId

    // find the event
    Event.findById(eventId)
        .then(handle404)
        // grab the specific activity using it's id
        .then(event => {
            // isolate the activity
            const theActivity = event.activities.id(activityId)
            // make sure the user is the owner of the event
            requireOwnership(req, event)
            // call remove on our activity subdoc
            theActivity.remove()
            // return the saved event
            return event.save()
        })
        // send a response
        .then(() => res.sendStatus(204))
        // pass errors to our error handler (using next)
        .catch(next)
})

// export our router
module.exports = router