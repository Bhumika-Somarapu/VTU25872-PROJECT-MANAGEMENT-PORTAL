const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - Updated for newer versions
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};
connectDB();

// Test Route
app.get('/', (req, res) => {
    res.json({ message: 'Task Management API is running' });
});

// Task Schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [20, 'Description must be at least 20 characters']
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('Task', taskSchema);

// Routes
// GET all tasks
app.get('/api/tasks', async (req, res) => {
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
});

// POST create task
app.post('/api/tasks', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        
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
});

// PUT update task status
app.put('/api/tasks/:id', async (req, res) => {
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
});

// DELETE task
app.delete('/api/tasks/:id', async (req, res) => {
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
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});