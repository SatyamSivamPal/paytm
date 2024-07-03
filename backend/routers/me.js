const express = require("express");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken")

const router = express.Router();

router.get("/", (req,res) => {
    const authHeader = req.headers.authorization;

    if(!authHeader && !authHeader.startsWith('bearer ')){
        return res.json({
            msg: "not validated",
            isAuthenticated: false
        })
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET)
    if(decoded.userId)
        {
            return res.json({
                msg: "validated",
                isAuthenticated: true
            })
        }
        return res.json({
            msg:"Not validated",
            isAuthenticated: false
        })
})


module.exports = router;