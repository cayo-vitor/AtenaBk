const Category = require('../models/Category');  // Importando o modelo de Category

// Criar uma nova categoria
exports.createCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const newCategory = new Category({
            name,
            description
        });

        await newCategory.save();
        res.status(201).json(newCategory);  // Retorna a nova categoria criada
    } catch (error) {
        res.status(500).json({ message: error.message });  // Retorna erro se não conseguir salvar
    }
};

// Listar todas as categorias
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();  // Obtém todas as categorias
        res.status(200).json(categories);  // Retorna as categorias
    } catch (error) {
        res.status(500).json({ message: error.message });  // Retorna erro caso falhe
    }
};

// Atualizar uma categoria
exports.updateCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,  // ID da categoria para atualizar
            { name, description },  // Novos dados para atualizar
            { new: true }  // Retorna o documento atualizado
        );
        res.status(200).json(updatedCategory);  // Retorna a categoria atualizada
    } catch (error) {
        res.status(500).json({ message: error.message });  // Retorna erro caso falhe
    }
};

// Excluir uma categoria
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);  // Deleta a categoria pelo ID
        res.status(200).json({ message: 'Categoria excluída com sucesso!' });  // Confirmação de exclusão
    } catch (error) {
        res.status(500).json({ message: error.message });  // Retorna erro caso falhe
    }
};
