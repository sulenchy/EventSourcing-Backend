const dotenv = require("dotenv");
const database = require("./config/database");
const cors = require("cors") 

const auth = require("./middleware/auth");
const usersRouter = require("./routes/users");
const eventsRouter = require("./routes/events");
const topicsRouter = require("./routes/topics");

const express = require("express");

dotenv.config();

database.connect();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(usersRouter);
app.use(auth, eventsRouter);
app.use(auth, topicsRouter);

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome to auth routes");
});

app.listen(PORT, console.log('server started at port', PORT));
