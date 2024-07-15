// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatList from './components/ChatList';
import ChatView from './components/ChatView';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Routes>
          <Route path="/chat/:id" element={<ChatView />} />
          <Route path="/" element={<ChatList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
