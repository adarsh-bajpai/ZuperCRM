const express = require("express");
const app = express();
const database = require("./src/database/connection")
require('dotenv').config();
const userRouter = require('./src/zuper/users/router/user.route')

database();
app.use(express.json());
app.use(userRouter);

let PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server connected ${PORT}`));
