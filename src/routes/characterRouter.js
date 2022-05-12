const { Router } = require("express")
const {
  getAllCharacters,
  createCharacter,
  editCharacter,
  deleteCharacter,
  getCharacterDetail,
  addMoviesOrSeries,
} = require("../controllers/characterControllers")

const router = Router()

router.get("/characters", getAllCharacters)
router.post("/create-character", createCharacter)
router.put("/edit-character", editCharacter)
router.delete("/delete-character", deleteCharacter)
router.get("/character-detail/:name", getCharacterDetail)
router.post("add-movies-or-series", addMoviesOrSeries)

module.exports = router
