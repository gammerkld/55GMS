import { Sequelize } from "sequelize";
import "dotenv/config";

const pgUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

let sequelize;
if (pgUrl) {
  sequelize = new Sequelize(pgUrl, {
    dialect: "postgres",
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
} else {
  // Fallback for local development when Postgres URL is not set.
  // Uses a lightweight SQLite file so the app can start without DB env vars.
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.SQLITE_STORAGE || "./database.sqlite",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
}

export default sequelize;
