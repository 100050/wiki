const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user");

router.route("/login")
    .get(controllers.viewLogin)
    .post(controllers.login);


router.route("/join")
    .get(controllers.viewJoin)
    .post(controllers.join);

router.route("/logout")
    .get(controllers.logout);

module.exports = router;