"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert("users", [
        {
          id: 0,
          email: "dummy@system.local",
          password: "no_password",
          subscription: "starter",
          token: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    } catch (error) {
      console.error("bulkInsert failed:", error);
    }

    await queryInterface.addColumn("contacts", "owner", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.changeColumn("contacts", "owner", {
      type: Sequelize.INTEGER,
      defaultValue: null,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("contacts", "owner");
    try {
      await queryInterface.bulkDelete("users", { id: 0 });
    } catch (error) {
      console.error("bulkDelete failed:", error);
    }
  },
};
