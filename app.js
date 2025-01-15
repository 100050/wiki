const express = require("express");

const app = express();
const port  = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/main"));

app.listen(port, () => {
    console.log(`${port} 포트에서 실행 중 ...`);
});