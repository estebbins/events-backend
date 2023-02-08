// import dependencies
const mongoose = require('mongoose')

// activity is a subdocument

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duration: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

module.exports = activitySchema