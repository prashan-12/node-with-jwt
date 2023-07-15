var jwt = require('jsonwebtoken');


exports.generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_TOKEN_KEY, { expiresIn: process.env.JWT_EXP_IN });
}

exports.isAuthenticated = (req, res, next) => {
    let bearerToken = req.headers['authorization'];
    if (Boolean(bearerToken) && Boolean(bearerToken.split(" ")[1])) {
        const actualToken = bearerToken.split(" ")[1];
        jwt.verify(actualToken, process.env.JWT_TOKEN_KEY, function (err, results) {
            if(err){
                res.status(401).json({ message: "Authentication token required! "});
            }else{
                req.token = { id: results.id, name: results.name };
                next();
            }
            
        });
    }else{
        res.status(401).json({ message: "Authentication token required! "});
    }
}