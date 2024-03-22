const express = require("express");
const router = express.Router();
const ingrController = require("../controllers/ingrController");

router.route("/")
.get(ingrController.getAll)

module.exports = router;