const express = require('express')
const routes = express.Router()
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// require('dotenv').config()
const { login, signup } = require('../controllers/auth.controller')
// const userModel = require('../models/users.model')

routes.use(express.json())
routes.use(express.urlencoded({ extended: true }))

routes.post('/login', login)
routes.post('/signup', signup)

module.exports = routes