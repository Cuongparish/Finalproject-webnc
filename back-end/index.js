const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());

const bookRouter = require("./routes/user.router");

app.use("/api/v1/user", bookRouter);

app.listen(process.env.PORT, () =>
  console.log("Server is running on port 5000")
);
