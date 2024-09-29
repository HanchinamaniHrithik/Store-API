require('dotenv').config(); // Load environment variables
console.log('MONGO_URI:', process.env.MONGO_URI); // This will help us see if MONGO_URI is loaded correctly.



const connectDB = require('./Db/Connect'); // Adjust the path if necessary
const Product = require('./Models/Products'); // Your Product model
const jsonProducts = require('./Products.json'); // Your JSON data file

const start = async () => {
    try {
        // Connect to the database
        await connectDB(process.env.MONGO_URI);
        console.log('Database connected successfully.');

        // Clear existing products
        await Product.deleteMany(); // Clear previous entries if needed
        console.log('Previous products deleted.');

        // Insert new products from JSON file
        await Product.create(jsonProducts);
        console.log('Products added successfully.');

        // Close the connection (optional, as the script will exit)
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1); // Exit with an error code
    }
};

start();
