// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormEditorPage from './pages/FormEditorPage';
import FormPreviewPage from './pages/FormPreviewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormEditorPage />} />
        <Route path="/preview/:formId" element={<FormPreviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
