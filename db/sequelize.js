import { Sequelize } from "sequelize";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const config = require("../config/config.cjs");

const sequelize = new Sequelize({
  ...config,
  logging: false,
  define: {
    underscored: true,
    timestamps: true,
  },
});

export default sequelize;
