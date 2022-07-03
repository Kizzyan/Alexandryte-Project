const express = require('express')

const userController = require('../controllers/user')

const router = express.Router()

router.get('/add-item', userController.getAddItem)

router.post('/add-item', userController.postAddItem)

router.get('/edit-item/:itemId', userController.getEditItem)

router.post('/edit-item', userController.postEditItem)

router.post('/delete-item/:itemId', userController.deleteItem)

module.exports = router