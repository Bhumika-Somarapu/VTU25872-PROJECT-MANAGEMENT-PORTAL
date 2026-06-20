import React from 'react';

const TaskFilters = ({ filter, onFilterChange }) => {
    const filters = ['All', 'Pending', 'In Progress', 'Completed'];

    return (
        <div className="task-filters">
            {filters.map(status => (
                <button
                    key={status}
                    className={`filter-btn ${filter === status ? 'active' : ''}`}
                    onClick={() => onFilterChange(status)}
                >
                    {status}
                </button>
            ))}
        </div>
    );
};

export default TaskFilters;  // ← Make sure this is here