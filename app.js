const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./config/db");
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

app.use("/", require("./routes/main"));

app.listen(port, () => {
    console.log(`${port} 포트에서 실행 중 ...`);
});