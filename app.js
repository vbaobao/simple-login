require('dotenv').config();
const express = require('express');
const connection = require('./database/db');
const users = require('./routes/users');
const login = require('./routes/login');
const app = express();
const server = process.env.SERVER || 'localhost';
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', users);
app.use('/api/login', login);

connection();
app.listen(3000, () => console.log(`App is listening at http://${server}:${port}`));
