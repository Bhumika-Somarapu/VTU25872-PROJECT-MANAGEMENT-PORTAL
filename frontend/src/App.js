import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/add-task" element={<AddTask />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;  // ← Make sure this is here