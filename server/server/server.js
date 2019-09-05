const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
require('./routes')(app);
// app.use(express.static(path.resolve(__dirname, '../../App-webpack/dist')));
// app.get('*', function (req, res) {
//   res.sendFile(path.resolve(__dirname, '../../App-webpack/dist/index.html'));
//   res.end();
// });
app.use(express.static(path.resolve(__dirname, '../../App-react-script/build')));
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../../App-webpack/build/index.html'));
  res.end();
});
app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;
