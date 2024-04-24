const express = require("express");
const app = express.Router();

const response = require("../helper/httpResposne");

const userRoutes = require("../zuper/users/router/user.route");

app.use(`/${process.env.USER}`, userRoutes);

app.get("/", (req, res) => {
  res.status(response.HTTP_OK).json({ message: "Welcome to Zuper CRM Tool!" });
});

module.exports = app;
