import React, { useState } from "react";
import blogData from "../components/blogData";
import "../styles/blog.css";

const Blog = () => {
  const [index, setIndex] = useState(0);
  const currentBlog = blogData[index];

  const handleNext = () => {
    if (index < blogData.length - 1) setIndex(index + 1);
  };

  const handlePrevious = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="blog-container">
      <div className="blog-card slide-animation">
        <h2 className="blog-title">{currentBlog.title}</h2>
        <p className="blog-content">{currentBlog.content}</p>
      </div>

      <div className="blog-buttons">
        <button onClick={handlePrevious} disabled={index === 0}>
          ⬅️ Previous
        </button>
        <button onClick={handleNext} disabled={index === blogData.length - 1}>
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default Blog;
