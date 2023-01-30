const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
	title: { type: String, required: true },
	short_description: String,
	description: String,
	createdAt: {
		type: Date,
		required: true,
		default: () => Date.now(),
		immutable: true,
	},
	updatedAt: { type: Date, required: true, default: () => Date.now() },
	column: { type: mongoose.SchemaTypes.ObjectId, required: true },
})

module.exports = mongoose.model('Card', cardSchema)
