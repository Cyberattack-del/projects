const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    preferences: { type: Object, default: {} },
});

module.exports = mongoose.model("User", UserSchema);