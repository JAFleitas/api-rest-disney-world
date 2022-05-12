const { Router } = require("express")

const {
  createMovieOrSerie,
  deleteMovieOrSerie,
  editMovieOrSerie,
  getAllMoviesOrSeries,
  getMovieOrSerieDetail,
  addCharacters,
} = require("../controllers/movieOrSerieControllers")

const router = Router()

router.get("/movies", getAllMoviesOrSeries)
router.get("/movie-detail/:title", getMovieOrSerieDetail)
router.post("/create-movie-or-serie", createMovieOrSerie)
router.put("/edit-movie", editMovieOrSerie)
router.delete("/detele-movie", deleteMovieOrSerie)
router.post("/add-characters", addCharacters)

module.exports = router
