// src/App.tsx

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

const UploadSample = lazy(() => import('./components/GhostWriter/UploadSample'));
const PersonaList = lazy(() => import('./components/GhostWriter/PersonaList'));
const GenerateContent = lazy(() => import('./components/GhostWriter/GenerateContent'));
const BlogPosts = lazy(() => import('./components/GhostWriter/BlogPosts'));
const NavBar = lazy(() => import('./components/Layout/NavBar'));
const Login = lazy(() => import('./components/Auth/Login'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));  // Import ProtectedRoute
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const About = lazy(() => import('./components/About/About'));
const Documentation = lazy(() => import('./components/Documentation/Documentation'));

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <NavBar />
          <div style={{ padding: '20px' }}>
            <Routes>
              <Route path="/home" element={<Dashboard />} />
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
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/about" 
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/documentation" 
                element={
                  <ProtectedRoute>
                    <Documentation />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
