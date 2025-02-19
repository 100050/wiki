const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECURE_KEY;

const checkLogin = (req, res, next) => {
    const token = req.cookies.token;
    req.isLogin = false;
    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.userId = decoded.id;
            req.isLogin = true;
        } catch(err) {
            res.redirect("/");
        }
    }
    next();
};

module.exports = checkLogin;