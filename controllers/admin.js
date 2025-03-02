const Document = require("../models/document");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const adminLayout = "../views/layouts/admin.ejs";

// get admin
const viewAdmin = asyncHandler(async (req, res) => {
    if (!req.isLogin || !req.isAdmin) {
        return res.redirect("/");
    }

    const locals =  {
        title: "관리자 페이지",
        isLogin: req.isLogin,
    };

    res.render("admin/main", { locals, layout: adminLayout });
});

// get admin/users
const viewUsers = asyncHandler(async (req, res) => {
    if (!req.isLogin || !req.isAdmin) {
        return res.redirect("/");
    }
    
    const locals =  {
        title: "관리자 페이지",
        isLogin: req.isLogin,
    };

    res.render("admin/users", { locals, query: null, users: null, layout: adminLayout });
});

// get admin/documents
const viewDocuments = asyncHandler(async (req, res) => {
    if (!req.isLogin || !req.isAdmin) {
        return res.redirect("/");
    }
    
    const locals =  {
        title: "관리자 페이지",
        isLogin: req.isLogin,
    };

    res.render("admin/documents", { locals, query: null, documents: null, layout: adminLayout });
});

// get admin/users/search
const searchUsers = asyncHandler(async (req, res) => { 
    const locals =  {
        title: "관리자 페이지",
        isLogin: req.isLogin,
    };

    const search = [
        {
            $search: {
                index: "searchUsers",
                text: {
                    query: req.query.query,
                    path: ["username"]
                }
            }
        },
        {
            $project: {
                _id: 1,
                username: 1,
                admin: 1,
                editable: 1,
            }
        }
    ];

    
    const users = await User.aggregate(search);

    res.render("admin/users", { locals, users, query: req.query.query, layout: adminLayout });
});

// get admin/documents/search
const searchDocuments = asyncHandler(async (req, res) => { 
    const locals =  {
        title: "관리자 페이지",
        isLogin: req.isLogin,
    };

    const search = [
        {
            $search: {
                index: "searchDocuments",
                text: {
                    query: req.query.query,
                    path: ["title"]
                }
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                editable: 1,
            }
        }
    ];

    
    const documents = await Document.aggregate(search);
    
    res.render("admin/documents", { locals, documents, query: req.query.query, layout: adminLayout });
});

// post admin/documents/:id
const editDocument = asyncHandler(async (req, res) => { // 되는지 확인
    const document = await Document.findById(req.params.id);

    try {
        document.editable = req.body.permission.includes("editable"); 
    } catch {
        document.editable = false;
    }
    
    await document.save();

    res.redirect("/admin/documents/search?query=" + req.body.query);
});

// post admin/users/:id
const editUser = asyncHandler(async (req, res) => { // 되는지 확인
    const user = await User.findById(req.params.id);

    try {
    user.editable = req.body.permission.includes("editable");
    user.admin = req.body.permission.includes("admin");
    } catch {
        user.admin = false;
        user.editable = false;
    }
    await user.save();

    res.redirect("/admin/users/search?query=" + req.body.query);
});

module.exports = {
    viewAdmin,
    viewUsers,
    viewDocuments,
    searchUsers,
    searchDocuments,
    editDocument,
    editUser,
}