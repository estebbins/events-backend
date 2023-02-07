const mongoose = require('mongoose')

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
