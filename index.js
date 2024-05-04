const express = require("express");
const app = express();
const database = require("./src/database/connection")
require('dotenv').config();
const router = require('./src/router/router')
const path = require('path')

database();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/src/images', express.static(path.join(__dirname, 'src', 'images')));
app.use(router);

let PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server connected ${PORT}`));
