const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const express = require("express");
const app = express();

require("dotenv").config();
require("./middlewares/auth.middleware");

app.use(express.json());

const accountRouter = require("./routes/account.router");
const classRouter = require("./routes/class.router");
const authRouter = require("./routes/auth.router");
const gradeRouter = require("./routes/grade.router");

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// origin: "https://frontend-finalproject-webnc.vercel.app",
app.use(
  cors({
    //origin: "https://frontend-finalproject-webnc.vercel.app",
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/api/v1/user", accountRouter);
app.use("/api/v1/user", classRouter);
app.use("/api/v1/user", gradeRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () =>
  console.log("Server is running on port 5000")
);
