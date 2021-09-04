require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.get('/', function(req, res){
    res.send('User api');
})

router.post('/login', async function(req, res){
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            // check if password is correct
            const validPassword = await bcrypt.compare(req.body.password, user.password);

            if(validPassword){
                // asign token
                const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN)
                res.json({accessToken: accessToken});

            }else{
                res.send('Password not match');
            }
        }else{
            res.send('email not found');
        }
    }catch(err){
        res.json(err);
    }
   
})

router.post('/register', async function(req, res){
    try{
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            email: req.body.email,
            name: {
                firstname: req.body.firstname,
                lastname: req.body.lastname
            },
            profilename: req.body.profilename,
            nickname: req.body.nickname,
            password: hashPassword, 
        });
        
        await user.save();

        res.json(user);

    }catch(err){
        res.json(err);
    }
    
})


module.exports = router;