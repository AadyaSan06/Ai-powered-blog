import React from 'react'
import './BlogItem.css'

const BlogItem = ({ id, name, description, image }) => {
  const url = "http://localhost:4000";

  return (
    <div className='blog-item'>
      <div className="blog-item-img-container">
        <img className='blog-item-image' src={url + "/images/" + image} alt="" />
      </div>
      <div className="blog-item-info">
        <p className='blog-item-name'>{name}</p>
        <p className="blog-item-desc">{description}</p>
      </div>
    </div>
  )
}

export default BlogItem