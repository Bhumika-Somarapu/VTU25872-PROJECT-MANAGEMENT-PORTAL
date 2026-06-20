const Task = require('../models/Task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching tasks',
            error: error.message 
        });
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        
        // Validation
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Title and description are required'
            });
        }

        if (description.length < 20) {
            return res.status(400).json({
                success: false,
                message: 'Description must be at least 20 characters'
            });
        }

        const task = await Task.create({
            title,
            description,
            status: status || 'Pending'
        });

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating task',
            error: error.message
        });
    }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Status is required'
            });
        }

        const task = await Task.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating task',
            error: error.message
        });
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error deleting task',
            error: error.message
        });
    }
};