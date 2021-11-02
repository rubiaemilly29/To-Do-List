const listTaskService = require('../services/listTaskService');

const create = async (req, res) => {
  const listCreated = await listTaskService.create(req.body);
  res.status(listCreated.status).json(listCreated.message);
};

const searchByAscendingCreationOrder = async (_req, res) => {
const listCreateOrderAsc = await listTaskService.searchByAscendingCreationOrder();
res.status(listCreateOrderAsc.status).json(listCreateOrderAsc.message);
};

const searchByDescendingCreationOrder = async (_req, res) => {
const listCreateOrderDesc = await listTaskService.searchByDescendingCreationOrder();
res.status(listCreateOrderDesc.status).json(listCreateOrderDesc.message);
};

const alphabeticalSearchAscending = async (_req, res) => {
const listAlphabeticalAsc = await listTaskService.alphabeticalSearchAscending();
res.status(listAlphabeticalAsc.status).json(listAlphabeticalAsc.message);
};

const alphabeticalSearchDescending = async (_req, res) => {
const listAlphabeticalDesc = await listTaskService.alphabeticalSearchDescending();
res.status(listAlphabeticalDesc.status).json(listAlphabeticalDesc.message);
};

const searchByStatus = async (req, res) => {
const listStatus = await listTaskService.searchStatus(req.query);
res.status(listStatus.status).json(listStatus.message);
};

module.exports = {
  create,
  searchByAscendingCreationOrder,
  searchByDescendingCreationOrder,
  alphabeticalSearchAscending,
  alphabeticalSearchDescending,
  searchByStatus,
};
