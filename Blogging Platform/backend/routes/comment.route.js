const express = require('express')
const routes = express.Router()
const authroutes = require('../middleware/auth')
const { addComment, getCommentsForPost, deleteComment } = require('../controllers/comment.controller')

routes.use(express.json())
routes.use(express.urlencoded({ extended: true }))
const verifyToken = authroutes.verifyToken


routes.get('/:postId', getCommentsForPost)
routes.post('/:postId', verifyToken, addComment)
routes.delete('/:postId/:id', deleteComment)

module.exports = routes