const { Router } = require("express")
const {
  getAllCharacters,
  createCharacter,
  editCharacter,
  deleteCharacter,
  getCharacterDetail,
} = require("../controllers/characterControllers")

const router = Router()

router.get("/characters", getAllCharacters)
router.post("/create-character", createCharacter)
router.put("/edit-character", editCharacter)
router.delete("/delete-character", deleteCharacter)
router.get("/character-detail/:name", getCharacterDetail)

module.exports = router
