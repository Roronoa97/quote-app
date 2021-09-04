const jwt = require('jsonwebtoken');
const path = require('path');

const authToken = function(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // if authHeader == true, get the token from auth header otherwise return undefined

    if(token == null){
        res.redirect('/login');
        // return res.sendStatus(401) //token is not send
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, decodedUser){
        if(err){
            res.redirect('/login');
            // res.sendStatus(403);
        }
        
        req.user = decodedUser;
        next();
    });
}

module.exports = authToken;