import React from 'react';
import TaskCard from './TaskCard';  // ← Check this import

const TaskList = ({ tasks, onComplete, onDelete }) => {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <p>No tasks available</p>
                <p className="empty-state-sub">Create your first task!</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskCard
                    key={task._id}
                    task={task}
                    onComplete={onComplete}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;  // ← Make sure this is here