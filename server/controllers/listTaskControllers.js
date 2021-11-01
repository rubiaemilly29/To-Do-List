const listTaskService = require('../services/listTaskService');

const create = async (req, res) => {
  const listCreated = await listTaskService.create(req.body);
  res.status(listCreated.status).json(listCreated.message);
};

const getAll = async (req, res) => {
const listGetAll = await listTaskService.getAll();
res.status(listGetAll.status).json(listGetAll.message);
};

module.exports = {
  create,
  getAll,
};
