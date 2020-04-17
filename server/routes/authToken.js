const jwt = require('jsonwebtoken');

const authToken = function(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // if authHeader == true, get the token from auth header otherwise return undefined

    if(token == null){
        return res.sendStatus(401) //token is not send
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, decodedUser){
        if(err){
            res.sendStatus(403);
        }
        
        req.user = decodedUser;
        next();
    });
}

module.exports = authToken;