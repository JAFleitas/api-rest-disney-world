const { Router } = require("express")
const characterRouter = require("./characterRouter")

const router = Router()

router.use(characterRouter)

module.exports = router
