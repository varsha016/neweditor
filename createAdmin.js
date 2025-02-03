const bcrypt = require('bcryptjs');
const { connectDB } = require('./src/utils/dbConnect');

const Admin = require('./app/models/adminModels');

async function createAdmin() {
    try {
        // Connect to the database
        await connectDB();

        // Plain text password
        const password = '123';
        const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password

        // Create new admin
        const newAdmin = new Admin({
            email: 'varsha@gmail.com',
            password: hashedPassword,  // Save the hashed password
        });

        // Save to database
        await newAdmin.save();
        console.log('Admin created successfully');
    } catch (error) {
        console.error('Error creating admin:', error);
    }
}

createAdmin();
