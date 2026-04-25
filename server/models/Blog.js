import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: {
    type: String,
    default: "General" // This prevents the "Database Error" if the field is missing
    },
    date: { type: Number, required: true }
});

const blogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);
export default blogModel;