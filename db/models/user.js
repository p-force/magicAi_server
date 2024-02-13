"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      address: DataTypes.TEXT,
      generate_img_count: DataTypes.INTEGER,
      mint_nft_count: DataTypes.INTEGER,
      points_total: DataTypes.INTEGER,
      refferal_points: DataTypes.INTEGER,
      refferals_arr: DataTypes.ARRAY(DataTypes.TEXT),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
