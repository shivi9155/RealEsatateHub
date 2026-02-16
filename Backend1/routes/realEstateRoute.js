const express = require("express");
const router = express.Router();

const { addProperty, getPropertyById } = require("../controllers/realEstateController");

router.post("/realEstate", addProperty);
router.get("/realEstate/:id", getPropertyById);

module.exports = router;
