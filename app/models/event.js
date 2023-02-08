const mongoose = require('mongoose')

const activitySchema = require('./activity')

// EVENTS -> Each event has an owner, name, description, setting, number of particpants

const eventSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
        setting: {
			type: String,
			required: true,
		},
        participants: {
            type: Number,
            required: true,
            minimum: 0
        },
        activities: [activitySchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Event', eventSchema)
