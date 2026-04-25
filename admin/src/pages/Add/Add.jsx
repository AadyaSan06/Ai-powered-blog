import React, { useState } from 'react';
import './Add.css';
import axios from "axios";

const Add = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Technology"); // Default value
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    // ALWAYS append text fields BEFORE the image for Multer
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category); 
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:4000/api/blog/add", formData);

      if (res.data.success) {
        alert("Blog Added Successfully!");
        setTitle("");
        setDescription("");
        setImage(null);
        e.target.reset(); // Resets the file input UI
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Full Error:", error.response?.data || error.message);
      alert("Error: Check console for validation details.");
    }
  };

  return (
    <div className='add'>
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <input 
          type="text" 
          placeholder="Blog Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Blog Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        ></textarea>
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Technology">Technology</option>
            <option value="Startup">Startup</option>
            <option value="Lifestyle">Lifestyle</option>
        </select>

        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])} 
          required 
        />
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

export default Add;