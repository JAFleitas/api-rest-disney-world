const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define(
    "Gender",
    {
      id: {
        type: DataTypes.UUID,
        defautValues: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false },
  )
}
