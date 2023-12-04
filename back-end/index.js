const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const express = require("express");
const app = express();

require("dotenv").config();
require("./middlewares/auth.middleware");

app.use(express.json());

const accountRouter = require("./routes/account.router");
const authRouter = require("./routes/auth.router");

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 		methods: "GET,POST,PUT,DELETE",
// 		credentials: true,
// 	})
// );

app.use("/api/v1/user", accountRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () =>
  console.log("Server is running on port 5000")
);
