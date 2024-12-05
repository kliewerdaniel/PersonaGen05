// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadSample from './components/GhostWriter/UploadSample';
import PersonaList from './components/GhostWriter/PersonaList';
import GenerateContent from './components/GhostWriter/GenerateContent';
import BlogPosts from './components/GhostWriter/BlogPosts';
import NavBar from './components/Layout/NavBar';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <UploadSample />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/personas" 
            element={
              <ProtectedRoute>
                <PersonaList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/generate" 
            element={
              <ProtectedRoute>
                <GenerateContent />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/blog-posts" 
            element={
              <ProtectedRoute>
                <BlogPosts />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
