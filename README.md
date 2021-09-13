# Simple Login API

This is a simple template of a login API using REST API with jwt and bcrypt. The default database used is MongoDB via Mongoose.

Path | Type | Detail
--- | --- | ---
/api/users/ | POST | Creates a new user with { email, username, token }
/api/login | POST | Logs user in ({ email, token }) and outputs a token
/api/user/me | GET | Verifies user token

## Requirements

- npm
- mongodb

## Packages Used

- mongoose
- jsonwebtoken
- bcrypt
- joi
- nodemon
- dotenv

## Usage

`npm install` will install all the necessary packages.
`npm start` will start the API and Mongo database called  `login-api` locally.
