const { Character } = require("../db")

async function getAllCharacters(req, res) {
  try {
    const characters = await Character.findAll({
      attributes: ["name", "image"],
    })

    if (characters.length > 0) {
      return res.json({ characters })
    } else {
      return res.json({ message: "" })
    }
  } catch (error) {
    return res.json({ message: error })
  }
}

module.exports = {
  getAllCharacters,
}
