const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgresql://employee_db_9tj5_user:h3ghBhVhngr7AQ20dhp3WIWyE02UBRY3@dpg-d7g8bvt8nd3s73a8bnag-a.ohio-postgres.render.com/employee_db_9tj5",
  {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize;