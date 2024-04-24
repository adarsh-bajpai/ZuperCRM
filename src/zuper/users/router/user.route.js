const express = require('express')

const app = express.Router();
const userController = require('./../controller/user.controller')

app.post('/createuser', userController.createUser);
app.get('/getallusers', userController.getAllUsers);
app.patch('/updatespecificuser', userController.updateSpecificUser);
app.patch('/deactivateuser', userController.deactivateUser);

module.exports = app ;