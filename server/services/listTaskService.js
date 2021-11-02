const listTaskModels = require('../models/listTaskmodels');

const create = async (task) => {
if (!task.task || !task.status) {
    return { status: 400, message: { mensagem: 'Task ou Status não preenchidos' } };
}
const listCreated = await listTaskModels.create(task);
return { status: 201, message: [listCreated] };
};

const searchByAscendingCreationOrder = async () => {
const listGetAll = await listTaskModels.getAll();
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

module.exports = {
  create,
  searchByAscendingCreationOrder,
  searchByDescendingCreationOrder,
  alphabeticalSearchAscending,
  alphabeticalSearchDescending,
  searchStatus,
};
