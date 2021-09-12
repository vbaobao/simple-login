require('dotenv').config();
const { Users, validateNewUser } = require('../database/models');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const createUser = async (req, res) => {
  try {
    const { error } = validateNewUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    req.body.token = await bcrypt.hash(req.body.token, salt);
    const user = new Users(req.body);
    await user.save();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.send('An error has occurred!');
  }
};

const getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).select("token");
    res.send(user);
  } catch (err) {
    console.error(err);
    res.send('An error occurred.')
  }
};

router.post('/', createUser);
router.get('/me', auth, getUser);

module.exports = router;
