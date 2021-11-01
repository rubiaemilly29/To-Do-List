const listTaskModels = require('../models/listTaskmodels');

const create = async (task) => {
  if (!task.task || !task.status) {
    return { status: 400, message: { mensagem: 'Task ou Status não preenchidos' } };
  }
  const listCreated = await listTaskModels.create(task);
  return { status: 201, message: [listCreated] };
};

module.exports = {
  create,
};
