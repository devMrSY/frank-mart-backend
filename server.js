const express = require("express");
const cors = require("cors");
const router = require("./routes/index.js");
const db = require("./db/index.js");

const app = express();
require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api", router);

db();

app.listen(4000, () => console.log("Server started on port 4000"));
