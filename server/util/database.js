const Sequelize = require("sequelize");

const sequelize = new Sequelize("fuse_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
