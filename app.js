const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const checkUser = require("./middlewares/checkUser");
require("dotenv").config();

const app = express();
const port  = process.env.PORT || 3000;

connectDB();

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(checkUser);

app.use("/", require("./routes/main"));
app.use("/", require("./routes/search"));
app.use("/", require("./routes/user"));
app.use("/admin", require("./routes/admin"));

app.listen(port, () => {
    console.log(`${port} 포트에서 실행 중 ...`);
});