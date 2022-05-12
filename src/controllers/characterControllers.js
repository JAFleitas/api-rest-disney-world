const { Character, MovieOrSerie } = require("../db")

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

async function createCharacter(req, res) {
  const { name, weight, history, age, image } = req.body

  try {
    if (
      name.length > 0 &&
      history.length > 0 &&
      image.length > 0 &&
      typeof weight === "number" &&
      typeof age === "number"
    ) {
      const [, created] = await Character.findOrCreate({
        where: { name },
        defaults: { weight, history, age, image },
      })

      if (created) {
        res.json({ message: "Successfully created character!" })
      } else {
        res.json({ message: "Character already exists!" })
      }
    } else {
      return res.json({ message: "Missing data!" })
    }
  } catch (error) {
    return res.json({ message: error })
  }
}

async function editCharacter(req, res) {
  const { id, name, weight, history, image, age, idMoviesOrSeries } = req.body
  try {
    if (id) {
      const character = await Character.findByPk(id)
      if (character) {
        if (name.length > 0) await character.update({ name })
        if (history.length > 0) await character.update({ history })
        if (image.length > 0) await character.update({ image })
        if (typeof age === "number") await character.update({ age })
        if (typeof weight === "number") await character.update({ weight })
        if (idMoviesOrSeries?.length > 0) {
          await character.setMovieOrSeries(idMoviesOrSeries)
        }
        await character.save()
        res.json({ message: "Character updated successfully!" })
      } else {
        res.json({ message: "Character not found!" })
      }
    } else {
      res.json({ message: "Character not found!" })
    }
  } catch (error) {
    res.json({ message: ";S" })
  }
}

async function deleteCharacter(req, res) {
  const { id } = req.body
  try {
    if (id) {
      const character = await Character.findByPk(id)
      if (character) {
        await character.destroy()
        res.json({ message: "Deleted character!" })
      } else {
        res.json({ message: "Character not found!" })
      }
    } else {
      res.json({ message: "Missing data!" })
    }
  } catch (error) {
    res.json({ message: error })
  }
}

async function getCharacterDetail(req, res) {
  const { name } = req.params
  try {
    if (name.length > 0) {
      const character = await Character.findOne({
        where: { name },
        include: [
          {
            model: MovieOrSerie,
          },
        ],
      })
      if (character) res.json({ character })
      else res.json({ message: "Character not found!" })
    } else {
      res.json({ message: "Missing data!" })
    }
  } catch (error) {
    res.json({ message: error })
  }
}

async function addMoviesOrSeries(req, res) {
  const { idCharacter, arrayIdMoviesOrSeries } = req.body

  try {
    if (idCharacter && arrayIdMoviesOrSeries.length > 0) {
      const character = await Character.findByPk(arrayIdMoviesOrSeries)

      await character.addMoviesOrSeries(arrayIdMoviesOrSeries)

      res.json({
        message:
          arrayIdMoviesOrSeries.length === 1
            ? "Added successfully!"
            : "Were added successfully!",
      })
    } else {
      res.json({ message: "Missing data!" })
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: "An unexepected error occurred!" })
  }
}

module.exports = {
  getAllCharacters,
  createCharacter,
  editCharacter,
  deleteCharacter,
  getCharacterDetail,
  addMoviesOrSeries,
}
