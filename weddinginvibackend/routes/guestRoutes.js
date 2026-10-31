
const express = require("express");
const router = express.Router();

const { createRSVP } = require("../controllers/guestController");

router.post("/", createRSVP);

module.exports = router;
