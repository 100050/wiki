const Document = require("../models/document");
const MarkdownIt = require('markdown-it');
const asyncHandler = require("express-async-handler");
const mainLayout = "../views/layouts/main.ejs";

/*
    TODO: 초성검색 구현
*/

// get /search
const search = asyncHandler(async (req, res) => { 
    const locals = {
        title: "검색",
        isLogin: req.isLogin,
        isAdmin: req.isAdmin,
    };

    const search = [
        {
            $search: {
                index: "searchDocuments",
                text: {
                    query: req.query.query,
                    path: ["title", "body"]
                }
            }
        },
        {
            $project: {
                _id: 0,
                title: 1,
                body: 1,
            }
        }
    ];

    
    const documents = await Document.aggregate(search);
    
    const md = MarkdownIt({ 
        html: true,
    });
    documents.forEach((document) => {
        const markdown = md.render(document.body);
        const pricePattern = /\[\[(.*?)\]\]/g;
        const match = markdown.replaceAll(pricePattern, `<a class="link" href="/document/$1">$1</a>`);
        document.body = match;
    });

    res.render("search", { locals, documents, query: req.query.query, layout: mainLayout });
});

module.exports = {
    search,
}