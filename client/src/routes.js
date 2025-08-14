import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import Concept from "./pages/Concept";
import ChatWindowWrapper from "./components/ChatWindow";
import QuizPage from "./pages/QuizPage";
import ProtectedRoute from './components/ProtectedRoute';
import Library from './pages/Library';             // ✅ NEW: Library page
import PDFViewer from './components/PdfViewerModal';         // ✅ NEW: Viewer page
import Compiler from './pages/CodeCompilerPage';
import TodoPage from './pages/TodoPage';
import Blog from './pages/Blog';
export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/explore" element={<Explore />} />

      <Route path="/concept" element={
        <ProtectedRoute>
          <Concept />
        </ProtectedRoute>
      } />

      <Route path="/chat" element={
        <ProtectedRoute>
          <ChatWindowWrapper />
        </ProtectedRoute>
      } />

      <Route path="/quiz" element={
        <ProtectedRoute>
          <QuizPage />
        </ProtectedRoute>
      } />

      {/* ✅ NEW ROUTES for library feature */}
      <Route path="/library" element={
        <ProtectedRoute>
          <Library />
        </ProtectedRoute>
      } />

      <Route path="/view-pdf/:id" element={
        <ProtectedRoute>
          <PDFViewer />
        </ProtectedRoute>
      } />

      <Route path="/compile-code" element={
  <ProtectedRoute>
    <Compiler />
  </ProtectedRoute>
} />

<Route path="/todo" element={
  <ProtectedRoute>
    <TodoPage />
  </ProtectedRoute>
} />

<Route path="/blogs" element={
  <ProtectedRoute>
    <Blog />
  </ProtectedRoute>
} />
    </Routes>
  );
}
