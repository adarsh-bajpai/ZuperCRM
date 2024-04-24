const express = require("express");
const app = express();
const database = require("./src/database/connection")
require('dotenv').config();
const router = require('./src/router/router')

database();
app.use(express.json());
app.use(router);

let PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server connected ${PORT}`));
