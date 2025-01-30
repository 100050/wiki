const express = require("express");
const router = express.Router();
const controllers = require("../controllers/main");

router.get("/", controllers.viewMain);

router.get("/document/:title", controllers.viewDocument);

router.route("/create/:title")
    .get(controllers.viewCreate)
    .post(controllers.createDocument);

module.exports = router;