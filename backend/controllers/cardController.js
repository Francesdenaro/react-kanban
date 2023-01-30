const asyncHandler = require('express-async-handler')
const Card = require('../models/cardModel')

/**
 * @desc Get card by id
 * @route GET /api/cards/single/:id
 */
const getCard = asyncHandler(async (req, res) => {
	const card = await Card.findOne({ _id: req.params.id })
	try {
		if (!card) {
			res.status(400)
			throw new Error('Card not found')
		}
		res.status(200).json(card)
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
})

/**
 * @desc Get all cards
 * @route GET /api/cards/:id
 */
const getCards = asyncHandler(async (req, res) => {
	try {
		const cards = await Card.find({ column: req.params.id })
		res.status(200).json(cards)
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
})

/**
 * @desc Create new card
 * @route POST /api/cards
 */
const createCard = asyncHandler(async (req, res) => {
	if (!req.body.title) {
		res.status(400)
		throw new Error('Please add a title for the card')
	}

	try {
		const card = await Card.create({
			title: req.body.title,
			short_description: req.body.short_description,
			description: req.body.description,
			column: req.body.column,
		})
		res.status(201).json(card)
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
})

/**
 * @desc  Update card
 * @route PUT /api/cards/cardId
 */
const updateCard = asyncHandler(async (req, res) => {
	const card = await Card.findById(req.params.id)

	if (!card) {
		res.status(404)
		throw new Error('Card not found')
	}
	try {
		const updatedCard = await Card.findByIdAndUpdate(req.params.id, {
			column: req.body.columnId,
		})

		res.status(204).json(updatedCard)
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
})

/**
 * @desc  Delete card
 * @route DELETE /api/cards/cardId
 */
const deleteCard = asyncHandler(async (req, res) => {
	console.log(req.params.id)
	try {
		await Card.deleteOne({
			_id: req.params.id,
		})
		res.status(204)
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
})

module.exports = { getCards, createCard, updateCard, getCard, deleteCard }
