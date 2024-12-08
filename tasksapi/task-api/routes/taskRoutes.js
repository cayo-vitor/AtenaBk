const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask
} = require('../controllers/taskController'); // Importando as funções do controller


// Criar uma nova tarefa
router.post('/', async (req, res) => {
    const { title, description, dueDate, status, priority, category, user } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            dueDate,
            status,
            priority, 
            category, // Incluindo prioridade
            user
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




//Listar tarefas por status

router.get('/andamento', async (req, res) => {
    try {
       
        const tasks = await Task.find({ status: 'em andamento' });
        
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'Nenhuma tarefa com esse status encontrado' });
        }

        res.status(200).json(tasks);  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/concluida', async (req, res) => {
    try {
        // Busca tarefas onde a prioridade é "baixa"
        const tasks = await Task.find({ status: 'concluída' });
        
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'Nenhuma tarefa com esse status encontrado' });
        }

        res.status(200).json(tasks);  // Retorna as tarefas com prioridade alta
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/pendente', async (req, res) => {
    try {
        // Busca tarefas onde a prioridade é "baixa"
        const tasks = await Task.find({ status: 'pendente' });
        
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'Nenhuma tarefa com esse status encontrado' });
        }

        res.status(200).json(tasks);  // Retorna as tarefas com prioridade alta
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//Listar por categoria 
router.get('/category/:categoryName', async (req, res) => {
    try {
        const { categoryName } = req.params; // Captura o parâmetro da URL
        
        // Filtra as tarefas pelo nome da categoria
        const tasks = await Task.find({ category: categoryName }); 
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'Nenhuma tarefa encontrada para esta categoria' });
        }

        res.status(200).json(tasks);  // Retorna as tarefas da categoria
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Listar tarefas por categoria específica (Exemplo de categorias como "trabalho", "estudo", etc)
router.get('/category/:categoryName', async (req, res) => {
    try {
        const { categoryName } = req.params; // Captura o parâmetro da URL
        
        const tasks = await Task.find({ category: categoryName }); // Filtra tarefas pela categoria
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'Nenhuma tarefa encontrada para esta categoria' });
        }

        res.status(200).json(tasks);  // Retorna as tarefas da categoria
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



//Listar tarefas por prioridade
router.get('/', async (req, res) => {
    const { priority } = req.query;  // Recebe a prioridade como parâmetro opcional

    try {
        let tasks;
        if (priority) {
            // Filtra as tarefas pela prioridade se fornecido
            tasks = await Task.find({ priority });
        } else {
            tasks = await Task.find();  // Caso contrário, retorna todas as tarefas
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/alta', async (req, res) => {
    try {
        // Busca tarefas onde a prioridade é "alta"
        const tasks = await Task.find({ priority: 'alta' });
        
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'Nenhuma tarefa com prioridade alta encontrada' });
        }

        res.status(200).json(tasks);  // Retorna as tarefas com prioridade alta
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/media', async (req, res) => {
    try {
        // Busca tarefas onde a prioridade é "media"
        const tasks = await Task.find({ priority: 'média' });
        
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'Nenhuma tarefa com prioridade média encontrada' });
        }

        res.status(200).json(tasks);  // Retorna as tarefas com prioridade alta
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/baixa', async (req, res) => {
    try {
        // Busca tarefas onde a prioridade é "baixa"
        const tasks = await Task.find({ priority: 'baixa' });
        
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'Nenhuma tarefa com prioridade baixa encontrada' });
        }

        res.status(200).json(tasks);  // Retorna as tarefas com prioridade alta
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;

// Atualizar uma tarefa com nova prioridade
router.put('/:id', async (req, res) => {
    const { title, description, dueDate, status, priority } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, dueDate, status, priority },  // Atualiza a prioridade também
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Atualizar uma tarefa com nova prioridade

router.get('/', async (req, res) => {
    try {
        const { priority } = req.query; // Captura o parâmetro "status" da URL
        const query = {};

        if (priority ) {
            query.status= priority; // Adiciona o filtro à consulta se o status for fornecido
        }

        const tasks = await Task.find(query);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Atualizar uma tarefa
router.put('/:id', async (req, res) => {
    const { title, description, dueDate, status } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, dueDate, status },
            { new: true }
        );
        
        if (!updatedTask) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Excluir uma tarefa
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Tarefa excluída com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
