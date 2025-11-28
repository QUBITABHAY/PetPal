const express = require("express")
const router = express.Router()

const db = require("../firebase/firebase")
const { initialController } = require("../controllers/init")
const { initialMiddleware } = require("../middlewares/init")

router.get("/", initialMiddleware, initialController)


router.get("/test-firestore", async (req, res) => {
  try {
    await db.collection("test").add({
      message: "Firestore connected!"
    })

    res.json({ success: true, message: "Connected to Firestore 🚀" })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

module.exports = router