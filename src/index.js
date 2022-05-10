require("dotenv").config()
const server = require("./server")
const { sequelize } = require("./db")
const PORT = process.env.PORT || 3001

sequelize.sync({ force: true }).then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
