const Document = require("../models/document");
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
        res.render("noDocument", { locals, layout: mainLayout });
    }
    
    res.render("document", { locals, document, layout: mainLayout });
});

// get /create/:title
const viewCreate = asyncHandler(async (req, res) => { 
    const locals =  {
        title: req.params.title,
        isLogin: req.isLogin,
    };
    
    res.render("create", { locals, layout: mainLayout });
});

// post /create/:title
const createDocument = asyncHandler(async (req, res) => { 
    const document = await Document.findOne( { title: req.params.title });
    if (document) {
        res.redirect("/document/" + req.params.title);
    }

    const title = req.params.title;
    const { body } = req.body;

    const newDocument = new Document({
        title: title,
        body: body,
    });

    await Document.create(newDocument);

    res.redirect("/document/" + title);
});

module.exports = {
    viewMain,
    viewDocument,
    viewCreate,
    createDocument,
}