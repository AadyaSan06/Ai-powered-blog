import React, { useState } from 'react';
import './Add.css';
import axios from "axios";

const Add = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Technology"); // Default value
  const [image, setImage] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false); // Tracks state while AI generates text

  // Function to call the backend Gemini AI generation endpoint
  const handleAiGeneration = async () => {
    if (!title.trim()) {
      alert("Please enter a blog title first so the AI knows what to write about!");
      return;
    }

    setLoadingAI(true);
    try {
      const res = await axios.post("http://localhost:4000/api/blog/generate-ai", { title });
      if (res.data.success) {
        setDescription(res.data.content); // Automatically injects AI content into the textarea
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("AI Generation Frontend Error:", error);
      alert("Could not connect to the AI generation service.");
    } finally {
      setLoadingAI(false);
    }
  };

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
      <form onSubmit={handleSubmit} className="add-form flex-col">
        
        {/* Title input with a flex row configuration to keep the AI button beautifully aligned beside it */}
        <div className="add-product-name flex-col">
          <p>Blog Title</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Type here" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              required 
              style={{ flex: 1 }}
            />
            <button 
              type="button" 
              onClick={handleAiGeneration} 
              disabled={loadingAI}
              style={{
                padding: '0 20px',
                backgroundColor: loadingAI ? '#555' : '#8a2be2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loadingAI ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '13px',
                whiteSpace: 'nowrap'
              }}
            >
              {loadingAI ? "Generating..." : "✨ Generate with AI"}
            </button>
          </div>
        </div>

        {/* Description textarea wrapped to match CSS class alignment */}
        <div className="add-product-description flex-col">
          <p>Blog Description</p>
          <textarea 
            placeholder="Write content here or use the AI generator above..." 
            rows="8"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            required 
          ></textarea>
        </div>
        
        {/* Category wrapper configured to use styling rules */}
        <div className="add-category-price">
          <div className="flex-col">
            <p>Blog Category</p>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Technology">Technology</option>
                <option value="Startup">Startup</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>
        </div>

        {/* Image Upload Input */}
        <div className="add-img-upload flex-col">
          <p>Upload Thumbnail</p>
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])}
            required 
          />
        </div>

        <button type="submit" className="add-btn">Add Blog</button>
      </form>
    </div>
  );
};

export default Add;