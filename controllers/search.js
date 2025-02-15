const Document = require("../models/document");
const asyncHandler = require("express-async-handler");
const mainLayout = "../views/layouts/main.ejs";

/*
    TODO: 초성검색 구현
*/

const search = asyncHandler(async (req, res) => { 
    const locals =  {
        title: "검색",
        isLogin: req.isLogin,
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

    // const documents = await Document.find({title: req.query.query});
    const documents = await Document.aggregate(search);

    res.render("search", { locals, documents, query: req.query.query, layout: mainLayout });
});

module.exports = {
    search,
}