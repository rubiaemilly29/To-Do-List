const listTaskModels = require('../models/listTaskmodels');

const create = async (task) => {
  if (!task.task || !task.status) {
    return { status: 400, message: { mensagem: 'Task ou Status não preenchidos' } };
  }
  const listCreated = await listTaskModels.create(task);
  return { status: 201, message: [listCreated] };
};

const getAll = async () => {
  const listGetAll = await listTaskModels.getAll();
return { status: 200, message: listGetAll };
};

module.exports = {
  create,
  getAll,
};
