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
const products = require('./routes/food')
const identification = require('./routes/identification')
const statistics   =  require('./routes/statistics')
const training   =  require('./routes/training')
const diary   =  require('./routes/diary')
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());

//SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//SERVICE
app.use('/products',products)
app.use('/identification',identification)
app.use('/statistics',statistics)
app.use('/training',training)
app.use('/diary',diary)



app.use(handlerError)

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
    console.log(`Server running. Use our API on port: ${port}`)
  })
  