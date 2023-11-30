const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());

const accountRouter = require("./routes/account.router");

app.use("/api/v1/user", accountRouter);

app.listen(process.env.PORT, () =>
  console.log("Server is running on port 5000")
);
