const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;
app.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working" });
});
app.use("/api", require("./routes/index"));

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`@ http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.log("Mongo Db connection failed", err);
  });
