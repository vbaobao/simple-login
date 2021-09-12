require('dotenv').config();
const express = require('express');
const connection = require('./database/db');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();
const server = process.env.SERVER || 'localhost';
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);

connection();
app.listen(3000, () => console.log(`App is listening at http://${server}:${port}`));
