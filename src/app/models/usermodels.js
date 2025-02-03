const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true },
    password: { type: String, required: true },
    codes: [{ code: String, verified: Boolean }], // Array to store codes and their verification status
    // role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Role field to distinguish between admin and user
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
