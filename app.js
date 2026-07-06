const express = require('express');
const tourRouter = require('./routes/tourRouter');

const app = express();

app.use(express.json());
app.use('/tours', tourRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong',
  });
});

module.exports = app;











