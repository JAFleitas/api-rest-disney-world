const { Router } = require("express")
const {
  createGenre,
  editGenre,
  deleteGenre,
  getGenres,
} = require("../controllers/genreControllers")
const router = Router()

router.get("/genres", getGenres)
router.post("/create-genre", createGenre)
router.put("/edit-genre", editGenre)
router.delete("/delete-genre", deleteGenre)

module.exports = router
