// Will be run by the script `npm run seed`
// This will seed our database with a bunch of events
// We can modify this later after building out our API

const mongoose = require('mongoose')
const Event = require('./event')
const db = require('../../config/db')

const startEvents = [
    { name: 'Date Night', description: 'a magical night for me and my partner to go on a date', setting: 'restaurant', participants: 2},
    { name: 'Charity Gala', description: 'a black tie event to raise money for my charity', setting: 'conference center', participants: 200},
    { name: 'Birthday Party', description: 'a party to celebrate my birthday!', setting: 'bar', participants: 15},
    { name: 'Movie Night', description: 'staying in and watching a movie!', setting: 'home', participants: 2}
]

// Connect to db
mongoose.connect(db, {
    useNewUrlParser: true
})
// remove all events
    .then(() => {
        Event.deleteMany()
            .then(deletedEvents => {
                console.log('the deleted events:', deletedEvents)
                // now add events to db
                Event.create(startEvents)
                    .then(newEvents => {
                        console.log('new events:', newEvents)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })
// add the start events

//  always close connection, whether it's a success or failure