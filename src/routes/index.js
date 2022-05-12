const { Router } = require("express")
const characterRouter = require("./characterRouter")
const movieRouter = require("./movieOrSerieRouter")
const router = Router()

router.use(characterRouter)
router.use(movieRouter)

module.exports = router
