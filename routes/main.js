const express = require("express");
const router = express.Router();
const controllers = require("../controllers/main");

router.get("/", controllers.viewMain);

router.get("/document/:title", controllers.viewDocument);

router.route("/edit/:title")
    .get(controllers.viewEdit)
    .post(controllers.editDocument);

router.route("/history/:title")
    .get(controllers.viewHistory);

module.exports = router;