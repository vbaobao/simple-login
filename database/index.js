const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB.'))
.catch(() => console.log('Error connecting.'));
