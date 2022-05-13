const { Genre } = require("../db")

async function createGenre(req, res) {
  const { name, image } = req.body
  try {
    if (name && image) {
      const [, created] = await Genre.findOrCreate({
        where: { name },
        default: { image },
      })

      if (created) {
        res.json({ message: "Successfully created!" })
      } else {
        res.json({ message: "It already exists!" })
      }
    } else {
      res.json({ message: "Missing data!" })
    }
  } catch (error) {
    console.log(error)
  }
}

async function editGenre(req, res) {
  const { idGenre, name, image } = req.body

  try {
    if (idGenre) {
      const genreEdit = await Genre.findByPk(idGenre)
      if (name?.length) {
        await genreEdit.update({ name })
        await genreEdit.save()
      }
      if (image?.length) {
        await genreEdit.update({ image })
        await genreEdit.save()
      }
    } else {
      res.json({ message: "Missing data!" })
    }
  } catch (error) {
    console.log(error)
  }
}
async function deleteGenre(req, res) {
  const { idGenre } = req.body

  try {
    if (idGenre) {
      const genre = await Genre.findByPk(idGenre)
      await genre.destroy()

      res.json({ message: "Genre removed!" })
    } else {
      res.json({ message: "Missing Data!" })
    }
  } catch (error) {
    console.log(error)
  }
}
async function getGenres(req, res) {
  try {
    const genres = await Genre.findAll()
    if (genres.length) {
      res.json({ genres })
    } else {
      res.json({ message: "Genres not found!" })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createGenre,
  editGenre,
  deleteGenre,
  getGenres,
}
