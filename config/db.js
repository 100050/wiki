const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const connectDB = asyncHandler(async () => {
    const connect = await mongoose.connect(process.env.DB_CONNECT);
    console.log(`DB 연걸 완료: ${connect.connection.host}`);
});

module.exports = connectDB;