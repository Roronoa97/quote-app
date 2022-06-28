const jwt = require('jsonwebtoken');
const path = require('path');

const authToken = function(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // if authHeader == true, get the token from auth header otherwise return undefined

    // IF NO TOKEN PRESENT
    if(token == null){
        res.redirect('/login');
        // res.status(403).json({message: "Token missing"}); // return 403 (not authorized) and msg
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, decodedUser){
        // IF TOKEN NOT VERIFIED
        // return 403 and err message
        if(err){
            res.status(403).json(err);
        }
        
        req.user = decodedUser; // SEND DECODED USER TO THE NEXT REQUEST

        next();
    });
}

module.exports = authToken;