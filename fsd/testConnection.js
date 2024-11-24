const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017';

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB is connected!');
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });
