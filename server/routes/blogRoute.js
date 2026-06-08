import express from "express";
import { addBlog, listBlog, removeBlog } from "../controller/blogController.js";
import { generateBlogContent } from "./aiController.js"; // Make sure this path points to your new aiController
import multer from "multer";

const blogRouter = express.Router();

// Multer Storage Setup
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, callback) => {
        return callback(null, `${Date.now()}${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Core Routes
blogRouter.post("/add", upload.single('image'), addBlog);
blogRouter.get("/list", listBlog);
blogRouter.post("/remove", removeBlog);

// AI Generation Route
blogRouter.post("/generate-ai", generateBlogContent);

export default blogRouter;