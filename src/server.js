const express = require("express")
const server = express()
const cors = require("cors")
const logger = require("morgan")

server.use(cors())
server.use(logger("dev"))
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  )
  next()
})

module.exports = server
