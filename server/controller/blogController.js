import blogModel from "../models/Blog.js";
import fs from 'fs';

// 1. API to add a new blog
const addBlog = async (req, res) => {
    console.log("Body Received:", req.body); 
    
    if (!req.file) {
        return res.json({ success: false, message: "Image is required" });
    }

    let image_filename = `${req.file.filename}`;

    const blog = new blogModel({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category || "General", 
        image: image_filename,
        date: Date.now() // CRITICAL: This fills the 'required' date field in your schema
    });

    try {
        await blog.save();
        console.log("Blog saved to DB successfully");
        res.json({ success: true, message: "Blog Added" });
    } catch (error) {
        console.log("Mongoose Error:", error);
        // Cleanup the image file if the database entry fails
        fs.unlink(`uploads/${image_filename}`, () => {});
        res.json({ success: false, message: "Database Error", error: error.message });
    }
}

// 2. API to get all blogs
const listBlog = async (req, res) => {
    try {
        const blogs = await blogModel.find({});
        res.json({ success: true, data: blogs });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching blogs" });
    }
}

// 3. API to remove a blog
const removeBlog = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.body.id);
        if (blog) {
            fs.unlink(`uploads/${blog.image}`, () => {});
            await blogModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Blog Removed" });
        } else {
            res.json({ success: false, message: "Blog not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { addBlog, listBlog, removeBlog };