import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import blogRouter from './routes/blogRoute.js';

// Load environment variables from .env file
dotenv.config(); //

const app = express();
app.use(express.json()); //
app.use(cors()); // Allows frontend to make requests to the backend server

// Database Connection
// Fallback to local MongoDB instance if process.env.MONGODB_URI is undefined
const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/quick-blog";

mongoose.connect(dbURI)
    .then(() => console.log(`DB Connected successfully to: ${dbURI}`))
    .catch((err) => {
        console.error("DB connection error:", err);
        process.exit(1); // Stop the server cleanly on critical connection failures
    });

// Basic Root Test Route
app.get('/', (req, res) => {
    res.send("API is working!"); //
});

// Main Blog API Routes
app.use("/api/blog", blogRouter); //

// Serving static uploaded image files via the /images route
app.use("/images", express.static('uploads')); //

// Start Server
app.listen(4000, () => {
    console.log("Server started on http://localhost:4000"); //
});