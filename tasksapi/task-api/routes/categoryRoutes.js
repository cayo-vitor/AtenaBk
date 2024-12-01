const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// Criar nova categoria
router.post('/', async (req, res) => {
    const { name, user } = req.body;

    try {
        const category = await Category.create({ name, user });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Listar categorias
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
