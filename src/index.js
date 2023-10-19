const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const app = express();
const passport = require('passport');
const foodRouter = require('./routes/food')
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());

app.use('/',foodRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});



app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
    console.log(`Server running. Use our API on port: ${port}`)
  })
  