import express from "express";
import { addBlog, listBlog, removeBlog } from "../controller/blogController.js";
import multer from "multer";

const blogRouter = express.Router();

// Setting up storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, callback) => {
        return callback(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Update the route to use 'upload.single' for the image
blogRouter.post("/add", upload.single('image'), addBlog);
blogRouter.get("/list", listBlog);
blogRouter.post("/remove", removeBlog);

export default blogRouter;