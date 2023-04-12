const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT = 3000 } = process.env;
const routes = require('./routes');
const globalErr = require('./middlewares/globalErr');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const helmet = require('helmet');
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

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log('shalom');
});