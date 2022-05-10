const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define(
    "MovieOrSerie",
    {
      id: {
        type: DataTypes.UUID,
        defautValues: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      rating: {
        type: DataTypes.ENUM(["1", "2", "3", "4", "5"]),
        allowNull: false,
      },
    },
    { timestamps: false },
  )
}
