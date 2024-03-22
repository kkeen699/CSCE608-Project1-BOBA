const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");
const verifyToken = require("../config/jwt");

router.route("/")
.get(verifyToken, listController.getAll)
.post(verifyToken, listController.addList)


router.route("/:listId")
.get(verifyToken, listController.getList)
.put(verifyToken, listController.updateList)
.delete(verifyToken, listController.deleteList)


router.route("/:listId/item")
.get(verifyToken, listController.getItem)
.post(verifyToken, listController.addItem)

router.route("/item/:itemId")
.put(verifyToken, listController.updateItem)
.delete(verifyToken, listController.deleteItem)

module.exports = router;