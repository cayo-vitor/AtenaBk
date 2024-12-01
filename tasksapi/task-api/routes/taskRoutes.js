const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Criar nova tarefa
router.post('/', async (req, res) => {
    const { title, description, dueDate, status, user, category } = req.body;

    try {
        const task = await Task.create({ title, description, dueDate, status, user, category });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Listar todas as tarefas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
