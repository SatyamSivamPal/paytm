const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config")

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({})
    }

    if(!authHeader.startsWith('Bearer ')){
        return res.status(403).json({})
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId)
            {
                req.userId = decoded.userId;
                next();
            }
            else{
                return res.status(403).json({})
            }
    } catch (error) {
        return res.status(501).json({
            msg: "Token is not valid"
        })
    }
}

module.exports = {
    authMiddleware,
}