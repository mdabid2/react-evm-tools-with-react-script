const express = require('express');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors');
const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8070;


// Configuration
// ================================================================================================
const db = 'mongodb://username:password@url:port/db';
const db_dev = 'mongodb://localhost:27017/event_management';

// Set up Mongoose
mongoose.connect(isDev ? db_dev : db);
mongoose.Promise = global.Promise;

const app = express();

var allowedOrigins = ['http://localhost:9000'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
require('./routes')(app);

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://localhost:%s/ in your browser.', port);
});

module.exports = app;
