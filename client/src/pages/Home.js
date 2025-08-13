
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* 1. Hero Banner */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span>StudySense 📚</span></h1>
          <p>Your smart companion for focused learning and personal growth.</p>
          <button className="cta-button" onClick={() => navigate('/explore')}>
            Explore Now
          </button>
        </div>
      </section>

      {/* 2. Why StudySense */}
      <section className="why-studysense">
        <h2>Why Choose StudySense?</h2>
        <div className="reasons-container">
          <div className="reason-card">
            <i className="fas fa-bolt"></i>
            <h3>Distraction-Free Learning</h3>
            <p>Isolate yourself from multiple tab distractions.</p>
          </div>
          <div className="reason-card">
            <i className="fas fa-chart-line"></i>
            <h3>Boost Productivity</h3>
            <p>Use technology to stay on track with your goals.</p>
          </div>
          <div className="reason-card">
            <i className="fas fa-book"></i>
            <h3>Smart Notes</h3>
            <p>Quickly save and organize your study notes anytime.</p>
          </div>
        </div>
      </section>

      {/* 3. Explore Features */}
      <section className="features-section">
        <h2>Explore Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">🤖 AI-powered Chatbot</div>
          <div className="feature-card">⏱️ Smart Quiz Generator</div>
          <div className="feature-card">💻 Code Compiler</div>
          <div className="feature-card">📰 Study Blogs</div>
        </div>
      </section>

      {/* 4. Testimonials or Extra */}
      <section className="testimonial-section">
        <h2>Trusted by Learners</h2>
        <p>⭐ "Student reviews coming soon!"</p>
      </section>

      <footer className="footer">
  <div className="footer-top">

    {/* Follow Us */}
    <div className="footer-section">
      <h3>Follow Us</h3>
      <div className="social-icons">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
      </div>
    </div>

    {/* Explore */}
    <div className="footer-section">
      <h3>Explore</h3>
      <a href="/">Home</a>
      <a href="/explore">Features</a>
      <a href="#">Plans</a>
      <a href="#">FAQs</a>
    </div>

    {/* Quick Links */}
    <div className="footer-section">
      <h3>Quick Links</h3>
      <a href="#">Contact</a>
      <a href="#">About</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
    </div>

    {/* Newsletter */}
    <div className="footer-section">
      <h3>Subscribe to Newsletter</h3>
      <p>Get weekly updates and study tips.</p>
      <input type="email" placeholder="Your email" />
      <button>Subscribe</button>
    </div>

    

    {/* Careers */}
    <div className="footer-section">
      <h3>Careers</h3>
      <p>Join our mission to make learning better.</p>
      <a href="#">View Openings</a>
    </div>
  </div>

  <div className="footer-bottom">
    <div>
      © 2025 StudySense. All rights reserved.
    </div>
    
  </div>
</footer>


    </div>
  );
}
