

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import NotesPanel from "./NotesPanel";
import Timer from "./Timer";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showNotes, setShowNotes] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ Don't render anything if not logged in
  if (!token) return null;

  return (
    <>
      <nav className="navbar bg-light custom-navbar">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Brand */}
          <Link className="navbar-brand" to="/">
            🎓 StudySense
          </Link>

          {/* Links */}
          <div className="d-flex align-items-center gap-3">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/explore">Explore</Link>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowNotes(true)}
            >
              Notes
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowTimer(true)}
            >
              Timer
            </button>
            <button
              className="btn btn-outline-danger logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <NotesPanel show={showNotes} onClose={() => setShowNotes(false)} />
      {showTimer && <Timer onClose={() => setShowTimer(false)} />}
    </>
  );
}

