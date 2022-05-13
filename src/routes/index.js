const { Router } = require("express")
const characterRouter = require("./characterRouter")
const movieRouter = require("./movieOrSerieRouter")
const genreRouter = require("./genreRouter")
const router = Router()

router.use(characterRouter)
router.use(movieRouter)
router.use(genreRouter)

module.exports = router
