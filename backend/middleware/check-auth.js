const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "this should be longer");
        next();
        console.log(token);
    } catch (e) {
        res.status(401).json({message: "Auth failed"})
    }

};
