import React, { useEffect, useState } from 'react'
import './BlogDisplay.css'
import axios from 'axios'
import BlogItem from '../BlogItem/BlogItem'

const BlogDisplay = ({ category }) => {

  const [blog_list, setBlogList] = useState([]);
  const url = "http://localhost:4000";

  const fetchBlogList = async () => {
    const response = await axios.get(`${url}/api/blog/list`);
    setBlogList(response.data.data);
  }

  useEffect(() => {
    fetchBlogList();
  }, [])

  return (
    <div className='blog-display' id='blog-display'>
      <h2>Top blogs for you</h2>
      <div className="blog-display-list">
        {blog_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return <BlogItem key={index} id={item._id} name={item.title} description={item.description} image={item.image} />
          }
        })}
      </div>
    </div>
  )
}

export default BlogDisplay