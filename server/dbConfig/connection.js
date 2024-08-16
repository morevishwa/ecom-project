const mongoose = require("mongoose");
require("dotenv").config();
const dburl = process.env.MNGODB_URI;
/* This code is establishing a connection to a MongoDB database using the Mongoose library. It is
creating a constant `dbConnection`  */
const dbConnection = mongoose
  .connect(dburl)
  .then(() => console.log("successfully connected to Database"))
  .catch((err) => console.log("error", err));

module.exports = dbConnection;
