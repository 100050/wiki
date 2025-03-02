const jwt = require("jsonwebtoken");
const User = require("../models/user");
const jwtSecret = process.env.JWT_SECURE_KEY;

const checkUser = async (req, res, next) => {
    const token = req.cookies.token;
    req.isLogin = false;
    req.isAdmin = false;
    if (token) {
        try {
            const decoded = await jwt.verify(token, jwtSecret);
            req.userId = decoded.id;
            req.isLogin = true;
            const user = await User.findById(req.userId);
            req.isAdmin = user.admin;
            req.isEditable = user.editable;
        } catch(err) {
            console.log(err);
        }
    }
    next();
};

module.exports = checkUser;