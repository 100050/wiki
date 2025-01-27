const express = require("express");
const router = express.Router();
const controllers = require("../controllers/main");

router.get("/", controllers.viewMain);

router.get("/document/:title", controllers.viewDocument);

router.get("/create/:title", controllers.viewCreate);

router.post("/create/:title", controllers.createDocument);

module.exports = router;