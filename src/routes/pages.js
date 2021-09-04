const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const authToken = require('./authToken');

router.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, '../views/login.html'));
})

router.get('/register', function(req, res){
    res.sendFile(path.join(__dirname, '../views/register.html'));
})

router.get('/dashboard',  authToken,  function(req, res){
    res.sendFile(path.join(__dirname, '../views/dashboard.html'));
})

module.exports = router;