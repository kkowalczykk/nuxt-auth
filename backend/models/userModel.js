const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        login: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 5 },
    }
);

module.exports = User = mongoose.model("user", userSchema);
