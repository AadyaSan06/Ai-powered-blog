import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import blogRouter from './routes/blogRoute.js';

dotenv.config(); // This loads your .env file

const app = express();
app.use(express.json());
app.use(cors()); // Allows your frontend to talk to your backend

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB connection error:", err));

app.get('/', (req, res) => {
    res.send("API is working!");
});

app.use("/api/blog", blogRouter);

app.use("/images", express.static('uploads'));


app.listen(4000, () => {
    console.log("Server started on http://localhost:4000");
});
