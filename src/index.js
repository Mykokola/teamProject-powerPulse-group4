const express = require("express");
const logger = require("morgan");
const cors = require("cors");
<<<<<<< Updated upstream
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
=======
const cookieParser = require('cookie-parser');
const port = process.env.PROT || 3000;
>>>>>>> Stashed changes
const app = express();
const passport = require("passport");

//SERVVICE export
const products = require("./routes/products");
const identification = require("./routes/identification");
const statistics = require("./routes/statistics");
const exercises = require("./routes/exercises");
const diary = require("./routes/diary");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());

//SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//SERVICE
app.use("/products", products);
app.use("/identification", identification);
app.use("/statistics", statistics);
app.use("/exercises", exercises);
app.use("/diary", diary);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});
