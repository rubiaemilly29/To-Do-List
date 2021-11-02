const listTaskService = require('../services/listTaskService');

const create = async (req, res) => {
  const listCreated = await listTaskService.create(req.body);
  res.status(listCreated.status).json(listCreated.message);
};

const searchByAscendingCreationOrder = async (req, res) => {
const listGetAll = await listTaskService.searchByAscendingCreationOrder();
res.status(listGetAll.status).json(listGetAll.message);
};

const searchByDescendingCreationOrder = async (req, res) => {
const listGetAll = await listTaskService.searchByDescendingCreationOrder();
res.status(listGetAll.status).json(listGetAll.message);
};

const alphabeticalSearchAscending = async (req, res) => {
const listGetAll = await listTaskService.alphabeticalSearchAscending();
res.status(listGetAll.status).json(listGetAll.message);
};

const alphabeticalSearchDescending = async (req, res) => {
const listGetAll = await listTaskService.alphabeticalSearchDescending();
res.status(listGetAll.status).json(listGetAll.message);
};

module.exports = {
  create,
  searchByAscendingCreationOrder,
  searchByDescendingCreationOrder,
  alphabeticalSearchAscending,
  alphabeticalSearchDescending,
};
