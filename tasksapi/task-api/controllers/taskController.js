const Task = require('../models/Task');

// Listar todas as tarefas com filtros
const getTasks = async (req, res) => {
  const { status, category, dueDate, priority } = req.query;

  let filter = {};

  // Filtros
  if (status) {
    filter.status = status;
  }
  if (category) {
    filter.category = category;  // Assumindo que você tem um campo 'category' no Task model
  }
  if (dueDate) {
    const dueDateObj = new Date(dueDate);
    filter.dueDate = { $lte: dueDateObj };  // Para buscar tarefas com data de vencimento até o filtro
  }
  if (priority) {
    filter.priority = priority;  // Supondo que você tenha esse campo para prioridades
  }

  try {
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  // outras funções...
};
