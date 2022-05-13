const { Sequelize, Op } = require("sequelize")
require("dotenv").config()
// importing models
const modelCharacter = require("./models/character")
const modelMovieOrSerie = require("./models/movieOrSerie")
const modelGenre = require("./models/genre")
const modelUser = require("./models/user")

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env
const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        {
          logging: false, // set to console.log to see the raw SQL queries
          native: false, // lets Sequelize know we can use pg-native for ~30% more speed
        },
      )

// injecting connection to Sequelize

modelCharacter(sequelize)
modelMovieOrSerie(sequelize)
modelGenre(sequelize)
modelUser(sequelize)

// table association

const { Character, MovieOrSerie, Genre } = sequelize.models

MovieOrSerie.belongsToMany(Character, {
  through: "associationMoviesCharacters",
  foreignKey: "Characters",
  timestamps: false,
})
Character.belongsToMany(MovieOrSerie, {
  through: "associationMoviesCharacters",
  foreignKey: "MoviesOrSeries",
  timestamps: false,
})

Genre.hasMany(MovieOrSerie, { foreignKey: "idGender" })
MovieOrSerie.belongsTo(Genre, { foreignKey: "idGender" })

module.exports = {
  sequelize,
  Op,
  ...sequelize.models,
}
