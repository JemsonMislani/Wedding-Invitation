const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middleware/adminAuth");
const {
  getRSVPStats,
  getAllGuests,
  searchGuests,
  deleteGuest,
} = require("../controllers/adminController");

// Protected admin route
router.get("/stats", verifyAdmin, getRSVPStats);
router.get("/guests", verifyAdmin, getAllGuests);
router.get("/guests/search", verifyAdmin, searchGuests);
router.delete("/guests/:id", verifyAdmin, deleteGuest);

module.exports = router;