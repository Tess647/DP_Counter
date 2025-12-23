const express = require("express");
const dpController = require("../controllers/dpController");
const router = express.Router();

router.get("/count", dpController.getCount);
router.post("/increment", dpController.incrementCount);
router.post("/reset", dpController.resetCount);

module.exports = router;