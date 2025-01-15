const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

router.get("/", asyncHandler(async (req, res) => { 
    const locals =  {
        title: "index"
    };
    res.render("index", { locals });
}))

module.exports = router;