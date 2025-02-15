const express = require("express");
const router = express.Router();
const controllers = require("../controllers/search");

router.route("/search")
    .get(controllers.search);

module.exports = router;