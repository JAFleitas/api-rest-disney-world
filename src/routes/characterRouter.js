const { Router } = require("express")
const { getAllCharacters } = require("controllers/characterControllers")

const router = Router()

router.get("/characters", getAllCharacters)

module.exports = router
