const Document = require("../models/document");
const MarkdownIt = require('markdown-it');
const User = require("../models/user");
var requestIp = require('request-ip');
const asyncHandler = require("express-async-handler");
const mainLayout = "../views/layouts/main.ejs";

// get /
const viewMain = asyncHandler(async (req, res) => { 
    const locals =  {
        title: "대문",
        isLogin: req.isLogin,
    };
    res.render("index", { locals, layout: mainLayout });
});

// get /document/:title
const viewDocument = asyncHandler(async (req, res) => { 
    const locals =  {
        title: req.params.title,
        isLogin: req.isLogin,
    };
    const document = await Document.findOne( { title: req.params.title });
    if (!document) {
        return res.render("noDocument", { locals, layout: mainLayout });
    }

    
    const md = MarkdownIt({ 
        html: true,
    });
    const markdown = md.render(document.body);
    const pricePattern = /\[\[(.*?)\]\]/g;
    const match = markdown.replaceAll(pricePattern, `<a class="link" href="/document/$1">$1</a>`);

    res.render("document", { locals, document, match, layout: mainLayout });
});

// get /edit/:title
const viewEdit = asyncHandler(async (req, res) => { 
    const locals =  {
        title: req.params.title,
        isLogin: req.isLogin,
    };
    let document = await Document.findOne( { title: req.params.title });
    if (!document) {
        document = {body: ""};
    }
    res.render("edit", { locals, document, layout: mainLayout });
});

// post /edit/:title
const editDocument = asyncHandler(async (req, res) => { // 되는지 확인
    const document = await Document.findOne( { title: req.params.title });
    const title = req.params.title;
    const { body } = req.body;
    const user = await User.findById(req.userId);
    
    let username;
    if (!user) {
        username = requestIp.getClientIp(req); // userIP 만들기
    }
    else {
        username = user.username;
    }

    if (document) {
        document.body = body;
        document.editUser.push(username);
        document.editAt.push(Date.now());

        await document.save();

        return res.redirect("/document/" + req.params.title);
    }

    const newDocument = new Document({
        title: title,
        body: body,
        editUser: [username],
        editAt: [Date.now()],
    });
    await Document.create(newDocument);

    res.redirect("/document/" + title);
});

// get /history/:title
const viewHistory = asyncHandler(async (req, res) => { 
    const locals =  {
        title: req.params.title,
        isLogin: req.isLogin,
    };
    const document = await Document.findOne({ title: req.params.title });
    let histories = [];
    for (let i = 0; i < document.editAt.length; i++) {
        histories.push({
            editAt: document.editAt[i], 
            editUser: document.editUser[i]
        });
    }

    res.render("history", { locals, histories, layout: mainLayout });
});

module.exports = {
    viewMain,
    viewDocument,
    viewEdit,
    editDocument,
    viewHistory,
}