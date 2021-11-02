const listTaskModels = require('../models/listTaskmodels');

const create = async (task) => {
if (!task.task || !task.status) {
    return { status: 422, message: { mensagem: 'Task ou Status não preenchidos' } };
}
const listCreated = await listTaskModels.create(task);
return { status: 201, message: [listCreated] };
};

const searchByAscendingCreationOrder = async () => {
const listGetAll = await listTaskModels.searchByAscendingDate();
return { status: 200, message: listGetAll };
};

const searchByDescendingCreationOrder = async () => {
const listGetAll = await listTaskModels.searchByDescendingDate();
return { status: 200, message: listGetAll };
};

const alphabeticalSearchAscending = async () => {
const listGetAll = await listTaskModels.getAll();
listGetAll.sort((a, b) => {
if (a.task.toLowerCase() < b.task.toLowerCase()) return -1;
    if (a.task.toLowerCase() > b.task.toLowerCase()) return 1;
    return 0;
});
return { status: 200, message: listGetAll };
};

const alphabeticalSearchDescending = async () => {
const listGetAll = await listTaskModels.getAll();
listGetAll.sort((a, b) => {
if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
});
return { status: 200, message: listGetAll };
};

const searchStatus = async (status) => {
  if (!status || status.status === '') {
    return { status: 400, message: { mensagem: 'Status não preenchidos' } };
  }
const listGetAll = await listTaskModels.searchStatus(status.status);
return { status: 200, message: listGetAll };
};

async function updateList(id, body) {
  console.log(id, body);
if (!body.task || !body.status || !id) {
    return { status: 422, message: { mensagem: 'Task, Id ou Status não preenchidos' } };
}

const { task, status } = body;

const setTask = await listTaskModels.updateList(id, task, status);
console.log(setTask);
if (!setTask) {
    return { status: 400, message: { mensagem: 'id inválido' } };
}
return { status: 200, message: setTask };
}

async function deleteList(id) {
const delList = await listTaskModels.deleteList(id);
if (!delList) {
  return { status: 422, message: { mensagem: 'id inválido' } };
}
return { status: 200, message: { mensagem: 'Tarefa apagada' } };
}

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
