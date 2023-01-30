const asyncHandler = require('express-async-handler')
const Column = require('../models/columnModel')

/**
 * @desc Get all columns
 * @route GET /api/columns
 */
const getColumns = asyncHandler(async (req, res) => {
	try {
		const columns = await Column.find()
		res.status(200).json(columns)
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
})

/**
 * @desc Get column by id
 * @route GET /api/columns/single/:id
 */
const getColumn = asyncHandler(async (req, res) => {
	try {
		const column = await Column.findOne({ _id: req.params.id })
		res.status(200).json(column)
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
})

/**
 * @desc Create new column
 * @route POST /api/columns
 */
const createColumn = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		res.status(400)
		throw new Error('Please add a name for the column')
	}

	try {
		const column = await Column.create({ name: req.body.name })
		res.status(201).json(column)
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
})

module.exports = { getColumns, getColumn, createColumn }
