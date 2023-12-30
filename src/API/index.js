const express = require('express');
//const cors = require('cors');

require('./utils/auth/strategy');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler, httpErrorHandler } = require('./middlewares/error.handler');
const routes = require('./routes');
const config = require('../../config');

const app = express();
const port = config.port;

//app.use(express.urlencoded());
app.use(express.json());

/*
const whitelist = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
*/

routes(app);

app.use((req, res) => {
  res.status(404).send('Page not found | 404')
});

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(httpErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
