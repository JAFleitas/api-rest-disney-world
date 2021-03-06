const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env
const { User } = require("../db")

module.exports = async (req, res, next) => {
  // el token viene en el header de la petición, lo tomamos:
  const token = req.header("Authorization")

  // Si no nos han proporcionado un token lanzamos un error
  if (!token) {
    return next({ status: 403, message: "Token not found" })
  }

  if (
    typeof token !== "undefined" &&
    token.toLowerCase().startsWith("bearer")
  ) {
    try {
      const tokenValidate = token.split(" ")[1]
      req.token = tokenValidate
      const decoded = jwt.verify(tokenValidate, JWT_SECRET)

      const user = await User.findByPk(decoded.user.id)

      // ningún usuario contiene ese correo
      if (!user) return next({ status: 400, message: "Invalid credentials" })

      req.user = user.dataValues

      next()
    } catch (error) {
      // console.log(error, token);
      res.sendStatus(403)
    }
  } else {
    // console.log('not token');
    res.sendStatus(403)
  }
}
