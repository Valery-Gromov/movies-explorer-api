const express = require('express');

const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT = 3000, DATABASE } = process.env;
const { errors } = require('celebrate');
const helmet = require('helmet');
const routes = require('./routes');
const globalErr = require('./middlewares/globalErr');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utills/rateLimit');

app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(globalErr);

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log('shalom');
});
