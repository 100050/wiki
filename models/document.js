const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    editUser: {
        type: [String],
        required: true,
    },
    editAt: {
        type: [Date],
        default: [Date.now()], // 잘 동작되는지 확인
    }
});

module.exports = mongoose.model("document", documentSchema);

