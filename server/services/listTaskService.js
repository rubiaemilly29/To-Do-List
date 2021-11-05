const listTaskModels = require('../models/listTaskmodels');

function transforIntoArray(allTask) {
  const array = [];
  allTask.forEach((element) => {
    const { _id, task, status, date } = element;
    const prop = { id: _id, task, status, date };
    array.push(prop);
  });
  return array;
}

const create = async (task) => {
  if (!task.task || !task.status) {
    return {
      status: 422,
      message: { mensagem: 'Task ou Status não preenchidos' },
    };
  }
  const listCreated = await listTaskModels.create(task);
  return { status: 201, message: [listCreated] };
};

const searchByAscendingCreationOrder = async () => {
  const listGetAll = await listTaskModels.getAll();
  listGetAll.sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });
  const result = transforIntoArray(listGetAll);
  return { status: 200, message: result };
};

const searchByDescendingCreationOrder = async () => {
  const listGetAll = await listTaskModels.getAll();
  listGetAll.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
  const result = transforIntoArray(listGetAll);
  return { status: 200, message: result };
};

const alphabeticalSearchAscending = async () => {
  const listGetAll = await listTaskModels.getAll();
  listGetAll.sort((a, b) => {
    if (a.task.toLowerCase() < b.task.toLowerCase()) return -1;
    if (a.task.toLowerCase() > b.task.toLowerCase()) return 1;
    return 0;
  });
  const result = transforIntoArray(listGetAll);
  return { status: 200, message: result };
};

const alphabeticalSearchDescending = async () => {
  const listGetAll = await listTaskModels.getAll();
  listGetAll.sort((a, b) => {
    if (a.task.toLowerCase() < b.task.toLowerCase()) return 1;
    if (a.task.toLowerCase() > b.task.toLowerCase()) return -1;
    return 0;
  });
  const result = transforIntoArray(listGetAll);
  return { status: 200, message: result };
};

const searchStatus = async (status) => {
  const statusCor = 'pendente' || 'em_andamento' || 'pronto';

  if (!status.status || status.status !== statusCor) {
    return { status: 400, message: { mensagem: 'Status não preenchidos' } };
  }
  const listGetAll = await listTaskModels.getStatus(status.status);
  const result = transforIntoArray(listGetAll);
  return { status: 200, message: result };
};

const updateList = async (id, body) => {
  if (!body.task || !body.status || !id) {
    return {
      status: 422,
      message: { mensagem: 'Task, Id ou Status não preenchidos' },
    };
  }

  const { task, status } = body;

  const setTask = await listTaskModels.updateList(id, task, status);
  console.log(setTask);
  if (!setTask) {
    return { status: 400, message: { mensagem: 'id inválido' } };
  }
  return { status: 200, message: setTask };
};

const deleteList = async (id) => {
  const delList = await listTaskModels.deleteList(id);
  if (!delList) {
    return { status: 422, message: { mensagem: 'id inválido' } };
  }
  return { status: 200, message: { mensagem: 'Tarefa apagada' } };
};

module.exports = {
  create,
  searchByAscendingCreationOrder,
  searchByDescendingCreationOrder,
  alphabeticalSearchAscending,
  alphabeticalSearchDescending,
  searchStatus,
  updateList,
  deleteList,
};
