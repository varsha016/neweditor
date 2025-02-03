
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
module.exports = mongoose.models.admins || mongoose.model("admins", adminSchema);
// export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
