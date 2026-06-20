import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onDismiss }) => {
    return (
        <div className="error-message-container">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{message}</span>
            {onDismiss && (
                <button className="error-dismiss" onClick={onDismiss}>×</button>
            )}
        </div>
    );
};

export default ErrorMessage;  // ← Make sure this is here