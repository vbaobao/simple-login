const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const joi = require('joi');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  token: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY);
  return token;
};

const Users = mongoose.model('users', userSchema);

const validateNewUser = (user) => {
  const schema = joi.object({
    username: joi.string().required(),
    email: joi.string().required(),
    token: joi.string().required(),
  });

  return schema.validate(user);
};

const validateCredentials = (user) => {
  const schema = joi.object({
    email: joi.string().required(),
    token: joi.string().required(),
  });

  return schema.validate(user);
};

module.exports = { Users, validateCredentials, validateNewUser};