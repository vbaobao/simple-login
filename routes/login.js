const { Users, validateCredentials } = require('../database/models');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const authenticate = async (req, res) => {
  try {
    const { error } = validateCredentials(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password!');

    const isValidToken = await bcrypt.compare(req.body.token, user.token);
    if (!isValidToken) return res.status(400).send('Invalid email or password!');
    
    const token = user.generateAuthToken();
    res.send(token);
  } catch(err) {
    console.error(err);
    res.send('An error has occurred!');
  }
};

router.post('/', authenticate);

module.exports = router;
