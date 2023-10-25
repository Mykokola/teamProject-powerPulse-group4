const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const app = express();
const passport = require('passport');
const handlerError = require('./middlewears/handlerError')
//SERVVICE export
const products = require("./routes/products");
const identification = require("./routes/identification");
const statistics = require("./routes/statistics");
const exercises = require("./routes/exercises");
const diary = require("./routes/diary");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const corsOptions = {
  origin: 'https://teamproject-powerpulse-group4.onrender.com', // Встановлення конкретного джерела запитів
  methods: 'GET,POST,PATCH,DELETE,OPTIONS', // Дозволяємо лише GET і POST запити
  allowedHeaders: 'Content-Type, Authorization', // Дозволені заголовки
  optionsSuccessStatus: 200 // Дозволений статус для префлайт-запиту
};


app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());

//SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://teamproject-powerpulse-group4.onrender.com'); // Додайте правильні джерела запитів
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH,OPTIONS, DELETE'); // Додайте підтримувані методи
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Додайте підтримувані заголовки
  
  next();
});

//SERVICE
app.use("/products", products);
app.use("/identification", identification);
app.use("/statistics", statistics);
app.use("/exercises", exercises);
app.use("/diary", diary);
 



app.use(handlerError)

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});
