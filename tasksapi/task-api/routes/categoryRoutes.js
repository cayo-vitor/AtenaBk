const express = require('express');
const categoryController = require('../controllers/categoryController');  // Importando o controller
const router = express.Router();

// Rota para criar uma nova categoria
router.post('/', categoryController.createCategory);

// Rota para listar todas as categorias
router.get('/', categoryController.getCategories);

// Rota para atualizar uma categoria existente
router.put('/:id', categoryController.updateCategory);

// Rota para excluir uma categoria
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
