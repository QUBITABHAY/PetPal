const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const { createPet, getUserPets, getPetById, updatePet } = require("../controllers/petController");
const upload = require("../middlewares/upload");

router.post("/", authenticateToken, upload.single('image'), createPet);
router.get("/", authenticateToken, getUserPets);
router.get("/:id", authenticateToken, getPetById);
router.put("/:id", authenticateToken, updatePet);

module.exports = router;
