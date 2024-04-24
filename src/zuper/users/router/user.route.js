const express = require('express')

const app = express.Router();
const userController = require('./../controller/user.controller')

app.post('/createuser', userController.createUser);

module.exports = app ;