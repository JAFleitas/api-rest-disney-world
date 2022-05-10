const { Router } = require("express")
const {
  getAllCharacters,
  createCharacter,
  editCharacter,
} = require("../controllers/characterControllers")

const router = Router()

router.get("/characters", getAllCharacters)
router.post("/create-character", createCharacter)
router.put("/edit-character", editCharacter)

module.exports = router
