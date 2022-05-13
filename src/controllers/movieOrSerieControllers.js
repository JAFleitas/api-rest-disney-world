const { Character, MovieOrSerie, Op, Genre } = require("../db")

async function getAllMoviesOrSeries(req, res) {
  const { title, genre, order } = req.query
  try {
    const settings = { where: {}, attributes: ["name", "image"] }
    if (title?.length) {
      settings.where = { title: { [Op.iLike]: `%${title}%` } }
    }
    if (genre) {
      settings.include = [{ model: Genre, where: { id: genre } }]
    }
    if (order) {
      settings.order = [["creationDate", order]]
    }

    const moviesOrSeries = await MovieOrSerie.findAll(settings)

    if (moviesOrSeries.length > 0) {
      return res.json({ moviesOrSeries })
    } else {
      return res.json({ message: "There are no movies or series!" })
    }
  } catch (error) {
    console.log(error)
    return res.json({ message: error })
  }
}

async function createMovieOrSerie(req, res) {
  const { title, creationDate, rating, image, idGenre } = req.body

  try {
    if (
      title.length > 0 &&
      creationDate.length > 0 &&
      image.length > 0 &&
      rating
    ) {
      const [movieOrSerie, created] = await MovieOrSerie.findOrCreate({
        where: { title },
        defaults: { image, creationDate, rating },
      })

      if (created) {
        await movieOrSerie.addGenre(idGenre)
        res.json({ message: "Successfully created!" })
      } else {
        res.json({ message: "It already exists!" })
      }
    } else {
      return res.json({ message: "Missing data!" })
    }
  } catch (error) {
    return res.json({ message: error })
  }
}

async function editMovieOrSerie(req, res) {
  const { id, title, creationDate, image, arrayIdCharacters, rating, idGenre } =
    req.body
  try {
    if (id) {
      const movieOrSerie = await MovieOrSerie.findByPk(id)
      if (movieOrSerie) {
        if (title.length > 0) await movieOrSerie.update({ name })
        if (creationDate) await movieOrSerie.update({ creationDate })
        if (rating) await movieOrSerie.update({ rating })
        if (image.length > 0) await movieOrSerie.update({ image })
        if (idGenre) {
          await movieOrSerie.setGenre(idGenre)
        }
        if (arrayIdCharacters?.length > 0) {
          await movieOrSerie.setMovieOrSeries(arrayIdCharacters)
        }
        await movieOrSerie.save()
        res.json({ message: "Updated successfully!" })
      } else {
        res.json({ message: "Movie not found!" })
      }
    } else {
      res.json({ message: "Movie not found!" })
    }
  } catch (error) {
    res.json({ message: "Page does not work!" })
  }
}

async function deleteMovieOrSerie(req, res) {
  const { id } = req.body
  try {
    if (id) {
      const movieOrSerie = await MovieOrSerie.findByPk(id)
      if (movieOrSerie) {
        await movieOrSerie.destroy()
        res.json({ message: "Successfully removed!" })
      } else {
        res.json({ message: "Movie not found!" })
      }
    } else {
      res.json({ message: "Missing data!" })
    }
  } catch (error) {
    res.json({ message: error })
  }
}

async function getMovieOrSerieDetail(req, res) {
  const { title } = req.params
  try {
    if (title.length > 0) {
      const movieOrSerie = await MovieOrSerie.findOne({
        where: { title },
        include: [
          {
            model: Character,
          },
        ],
      })
      if (movieOrSerie) res.json({ movieOrSerie })
      else res.json({ message: "Movie not found!" })
    } else {
      res.json({ message: "Missing data!" })
    }
  } catch (error) {
    res.json({ message: error })
  }
}

async function addCharacters(req, res) {
  const { idMovieOrSerie, arrayIdCharacters } = req.body

  try {
    if (idMovieOrSerie && arrayIdCharacters.length > 0) {
      const movieOrSerie = await MovieOrSerie.findByPk(arrayIdCharacters)

      await movieOrSerie.addMoviesOrSeries(arrayIdCharacters)

      res.json({
        message:
          arrayIdCharacters.length === 1
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
  getAllMoviesOrSeries,
  createMovieOrSerie,
  editMovieOrSerie,
  deleteMovieOrSerie,
  getMovieOrSerieDetail,
  addCharacters,
}
