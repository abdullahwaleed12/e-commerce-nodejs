const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
  .connect(process.env.DB_URI)
  .then((conn) => {
    console.log(`DataBase connected: ${conn.connection.host}`);
  })
  .catch((err) => {
    console.error(`DataBase error: ${err}`);
    process.exit(1);
  });
}

module.exports = dbConnection