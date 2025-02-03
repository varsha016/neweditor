import jwt from 'jsonwebtoken';
import User from '../../models/usermodels';
// import User from "../../../models/userModels";


const authenticateAdmin = async (req, res, next) => {
    // Get token from headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication token is missing" });
    }

    try {
        // Verify token using JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID (from the decoded token)
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is the admin (you can use email, or any other identifier to verify admin)
        if (user.email !== process.env.ADMIN_EMAIL) { // Replace with the email or condition of your admin
            return res.status(403).json({ message: "Permission denied. Admin access required" });
        }

        // If everything is fine, pass the user object to the next function (handler)
        req.user = user; // Attach user to the request object
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export { authenticateAdmin };
