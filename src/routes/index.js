const { Router } = require("express")
const characterRouter = require("./characterRouter")
const movieRouter = require("./movieOrSerieRouter")
const genreRouter = require("./genreRouter")
const userRouter = require("./userRouter")
const auth = require("../../middlewares/auth")
const router = Router()

router.use(auth, characterRouter)
router.use(auth, movieRouter)
router.use(auth, genreRouter)
router.use(userRouter)

module.exports = router
