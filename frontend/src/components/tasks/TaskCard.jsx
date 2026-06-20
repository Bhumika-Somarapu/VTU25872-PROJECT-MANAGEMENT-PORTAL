import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onComplete, onDelete }) => {
    const getStatusColor = (status) => {
        switch(status) {
            case 'Completed': return 'status-completed';
            case 'In Progress': return 'status-progress';
            default: return 'status-pending';
        }
    };

    return (
        <div className="task-card">
            <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <span className={`task-status ${getStatusColor(task.status)}`}>
                    {task.status}
                </span>
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-footer">
                <span className="task-date">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                </span>
                <div className="task-actions">
                    {task.status !== 'Completed' && (
                        <button 
                            className="btn-complete"
                            onClick={() => onComplete(task._id)}
                        >
                            Complete
                        </button>
                    )}
                    <button 
                        className="btn-delete"
                        onClick={() => onDelete(task._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;  // ← Make sure this is here