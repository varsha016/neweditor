const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // Optional: Track when the admin was created
});

module.exports = mongoose.models.admins || mongoose.model("admins", adminSchema);
