import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading tasks...</p>
        </div>
    );
};

export default LoadingSpinner;  // ← Make sure this is here