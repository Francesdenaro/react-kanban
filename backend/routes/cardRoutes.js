const express = require('express')
const router = express.Router()
const {
	getCards,
	createCard,
	updateCard,
	getCard,
	deleteCard,
} = require('../controllers/cardController')

router.route('/:id').get(getCards).put(updateCard).delete(deleteCard)
router.route('/').post(createCard)
router.route('/single/:id').get(getCard)
module.exports = router
