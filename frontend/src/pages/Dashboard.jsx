import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../services/api';
import TaskList from '../components/tasks/TaskList';  // ← Check this import
import TaskFilters from '../components/tasks/TaskFilters';  // ← Check this import
import LoadingSpinner from '../components/common/LoadingSpinner';  // ← Check this import
import ErrorMessage from '../components/common/ErrorMessage';  // ← Check this import
import './Dashboard.css';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        filterTasks();
    }, [tasks, filter]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await taskService.getTasks();
            setTasks(data.data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const filterTasks = () => {
        if (filter === 'All') {
            setFilteredTasks(tasks);
        } else {
            setFilteredTasks(tasks.filter(task => task.status === filter));
        }
    };

    const handleComplete = async (id) => {
        try {
            await taskService.updateTaskStatus(id, 'Completed');
            await fetchTasks();
        } catch (err) {
            setError('Failed to complete task');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.deleteTask(id);
                await fetchTasks();
            } catch (err) {
                setError('Failed to delete task');
            }
        }
    };

    const getStats = () => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'Completed').length;
        const pending = tasks.filter(t => t.status === 'Pending').length;
        const inProgress = tasks.filter(t => t.status === 'In Progress').length;
        return { total, completed, pending, inProgress };
    };

    const stats = getStats();

    if (loading) return <LoadingSpinner />;

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Task Dashboard</h1>
                <button 
                    className="btn-add-task"
                    onClick={() => navigate('/add-task')}
                >
                    + Add New Task
                </button>
            </header>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <span className="stat-number">{stats.total}</span>
                    <span className="stat-label">Total Tasks</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{stats.pending}</span>
                    <span className="stat-label">Pending</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{stats.inProgress}</span>
                    <span className="stat-label">In Progress</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{stats.completed}</span>
                    <span className="stat-label">Completed</span>
                </div>
            </div>

            {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

            <div className="dashboard-controls">
                <TaskFilters filter={filter} onFilterChange={setFilter} />
            </div>

            <TaskList 
                tasks={filteredTasks} 
                onComplete={handleComplete}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Dashboard;  // ← Make sure this is here