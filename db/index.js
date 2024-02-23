const mongoose = require("mongoose");
require("dotenv").config();

// Connect Mongodb __________________________
const dbUser = encodeURIComponent(process.env.MONGODB_ADMIN);
const dbPass = encodeURIComponent(process.env.MONGODB_PASSWORD);
const dbName = encodeURIComponent(process.env.MONGODB_DBNAME);


const dbUris =
  "mongodb+srv://" + dbUser + ":" + dbPass + "@cluster0.z7i3akf.mongodb.net";


async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(`${dbUris}/${dbName}`);
    console.log(
      `\n Mongodb connected !! host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("error failed", error);
    throw error;
  }
}

module.exports = connectDB;
