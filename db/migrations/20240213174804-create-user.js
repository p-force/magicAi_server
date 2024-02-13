/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.TEXT,
      },
      generate_img_count: {
        type: Sequelize.INTEGER,
      },
      mint_nft_count: {
        type: Sequelize.INTEGER,
      },
      points_total: {
        type: Sequelize.INTEGER,
      },
      refferal_points: {
        type: Sequelize.INTEGER,
      },
      refferals_arr: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
