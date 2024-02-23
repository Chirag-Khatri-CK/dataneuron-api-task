const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({
  credentials: true,
  origin: '*',
  optionsSuccessStatus: 200
}));

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`@ http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.log("Mongo Db connection failed", err);
  });

app.use("/api", require("./routes/index"));
