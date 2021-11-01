const listTaskService = require('../services/listTaskService');

const create = async (req, res) => {
  const listCreated = await listTaskService.create(req.body);
  res.status(listCreated.status).json(listCreated.message);
};

module.exports = {
  create,
};
