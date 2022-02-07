const  express = require('express');
const  path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose')
const cors = require("cors");
const dotenv = require('dotenv')
dotenv.config();
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

mongoose.connect(process.env.connectionsUri,{useNewUrlParser: true ,useUnifiedTopology : true},(error)=> {
  if(error) {
      console.log(error)
  } else {
      console.log('connection established successfully')
  }
})
const app = express();
app.use(cors({ origin: true }));
app.disable('x-powered-by');
const swaggerOptions = {
  definition : {
    openapi: '3.0.0',
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'test server',
      },
    ],
  },
  apis : [path.join(__dirname,'routes/routes.js')] 
}


var options = {
  explorer: true
};
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs,options));
// View engine setup
app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Routes

app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

module.exports = app;
