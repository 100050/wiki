const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        dafault: false,
        require: true,
    },
    editable: {
        type: Boolean,
        default: true,
        require: true,
    }
});

module.exports = mongoose.model("user", userSchema);

