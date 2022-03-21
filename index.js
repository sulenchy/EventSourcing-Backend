const dotenv = require("dotenv");
const database = require("./config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors") 

const auth = require("./middleware/auth");
const User = require("./model/user");
const usersRouter = require("./routes/users");

const express = require("express");

dotenv.config();

database.connect();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(usersRouter);

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome to auth routes");
});

app.listen(PORT, console.log('server started at port', PORT));
