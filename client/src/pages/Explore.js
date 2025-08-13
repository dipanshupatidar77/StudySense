
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Explore.css';

export default function Explore() {
  const navigate = useNavigate();

  return (
    <div className="explore-container">
      <h2 className="text-center mb-4">Explore Features</h2>
      <div className="row justify-content-center">

        {/* 🗨️ AI Smart Chatbot */}
        <div className="col-md-3 m-2">
          <div className="card feature-card" onClick={() => navigate('/chat')}>
            <div className="card-body text-center">
              <h5 className="card-title">AI Smart Chatbot</h5>
              <p className="card-text">Now clear youer concepts with the Power of AI</p>
            </div>
          </div>
        </div>

        {/* ✅ Smart Answer Evaluator */}
        <div className="col-md-3 m-2">
          <div className="card feature-card" onClick={() => navigate('/quiz')}>
            <div className="card-body text-center">
              <h5 className="card-title">Smart Practice </h5>
              <p className="card-text">AI-powered Questions Generator</p>
            </div>
          </div>
        </div>

       

        {/* 🔧 Code Compiler */}
        <div className="col-md-3 m-2">
          <div className="card feature-card" onClick={() => navigate("/compile-code")}>
            <div className="card-body text-center">
              <h5 className="card-title">🔧 Code Compiler</h5>
              <p className="card-text">Write and run code in multiple languages</p>
            </div>
          </div>
        </div>

        {/* 📝 Todo List */}
        <div className="col-md-3 m-2">
          <div className="card feature-card" onClick={() => navigate("/todo")}>
            <div className="card-body text-center">
              <h5 className="card-title">📝 My Todo List</h5>
              <p className="card-text">Add, edit and manage your daily tasks</p>
            </div>
          </div>
        </div>

        {/* 📖 Study & Career Blogs */}
    <div className="col-md-3 m-2">
       <div className="card feature-card" onClick={() => navigate("/blogs")}>
    <div className="card-body text-center">
      <h5 className="card-title">📖 Study Blogs</h5>
      <p className="card-text">Get daily study tips, career advice & news</p>
    </div>
  </div>
</div>

 {/* 📚 My Digital Library */}
        <div className="col-md-3 m-2">
          <div className="card feature-card" onClick={() => navigate("/library")}>
            <div className="card-body text-center">
              <h5 className="card-title">personal Digital Library</h5>
              <p className="card-text">Explore your Own Library</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
