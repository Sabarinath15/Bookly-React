const express = require('express');
const router = express.Router();

const { createUser, getUser, checkUser } = require('../controllers/accountControl');


router.route('/create').post(createUser); //to create a new user
router.route('/check/:email').get(checkUser); //to check a user is available
router.route('/user/:email').get(getUser); //to get the details of the user

module.exports = router;