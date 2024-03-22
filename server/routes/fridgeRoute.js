const express = require("express");
const router = express.Router();
const fridgeController = require("../controllers/fridgeController");
const verifyToken = require("../config/jwt");

router.route("/")
.get(verifyToken, fridgeController.getFridge)
.post(verifyToken, fridgeController.addFridge)

router.route("/:itemId")
.put(verifyToken, fridgeController.updateFridge)
.delete(verifyToken, fridgeController.deleteFridge)

module.exports = router;