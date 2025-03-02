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
    editable: {
        type: Boolean,
        default: true,
    },
    editUser: {
        type: [String],
        required: true,
    },
    editAt: {
        type: [Date],
        default: [Date.now()],
        required: true,
    },
});

module.exports = mongoose.model("document", documentSchema);

