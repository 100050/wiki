const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mainLayout = "../views/layouts/main.ejs";
const jwtSecret = process.env.JWT_SECURE_KEY;

// get /login
const viewLogin = asyncHandler(async (req, res) => { 
    const locals =  {
        title: "로그인",
        isLogin: req.isLogin,
    };
    const isLogin = req.isLogin;
    res.render("login", { locals, err: null, isLogin,  layout: mainLayout });
});

// post /login
const login = asyncHandler(async (req, res) => { 
    const locals = {
        title: "로그인",
        isLogin: req.isLogin,
    }
    const { id, password} = req.body;
    const user = await User.findOne({ id });
    if (!user) {
        res.render("login", {locals, err: "일치하는 사용자가 없습니다.", layout: mainLayout});
        //return res.status(401).json({ message: "일치하는 사용자가 없습니다. "});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        res.render("login", {locals, isLogin, err: "비밀번호가 일치하지 않습니다.", layout: mainLayout});
        //return res.status(401).json({ message: "비밀번호가 일치하지 않습니다. "});    
    }

    const token = jwt.sign({ id: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/");

    //res.render("login", {locals, err: "맞는 사용자가 없습니다.", layout: mainLayout});
});

// get /join
const viewJoin = asyncHandler(async (req, res) => { 
    const locals =  {
        title: "회원가입",
        isLogin: req.isLogin,
    };
    
    res.render("join", { locals, layout: mainLayout });
});

// post /join
const join = asyncHandler(async (req, res) => {
    const { username, id, password, password2 } = req.body;

    if (password !== password2) {
        res.redirect("join");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        username: username,
        id: id,
        password: hashedPassword,
    });
    
    await User.create(newUser);
    
    res.redirect("/login");
});

// get /logout
const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});


module.exports = {
    viewLogin,
    login,
    viewJoin,
    join,
    logout,
}