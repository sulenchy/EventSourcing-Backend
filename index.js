const dotenv = require("dotenv");
const database = require("./config/database");
const express = require("express");

dotenv.config();

database.connect();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.listen(PORT, console.log('server started at port', PORT));