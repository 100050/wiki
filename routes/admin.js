const express = require("express");
const router = express.Router();
const controllers = require("../controllers/admin");

router.get("/", controllers.viewAdmin);

router.route("/users")
    .get(controllers.viewUsers);

router.route("/users/:id")
    .post(controllers.editUser);

router.route("/documents")
    .get(controllers.viewDocuments);

router.route("/documents/:id")
    .post(controllers.editDocument)
    .delete(controllers.deleteDocument);

router.route("/users/search")
    .get(controllers.searchUsers);

router.route("/documents/search")
    .get(controllers.searchDocuments);

module.exports = router;