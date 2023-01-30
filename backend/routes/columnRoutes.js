const express = require('express')
const router = express.Router()
const {
	getColumns,
	getColumn,
	createColumn,
} = require('../controllers/columnController')

router.route('/').get(getColumns).post(createColumn)
router.route('/single/:id').get(getColumn)

module.exports = router
