const express = require("express")
const router = express.Router()
const postsList = require("../data/posts.js")
const postsController = require(('../controllers/postsController.js'))
const routesChecker = require('../middlewares/routesChecker')

router.get('/', postsController.index)
// index

router.get('/:id', routesChecker, postsController.show)
//show

router.post('/', postsController.store)
//create

router.put('/:id', routesChecker, postsController.update)
//update

router.delete('/:id', routesChecker, postsController.destroy)
//destroy 

module.exports = router