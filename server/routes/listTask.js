const router = require('express').Router();
const listTaskControllers = require('../controllers/listTaskControllers'); 

router.get('/', listTaskControllers.getAll);
router.post('/', listTaskControllers.create);

module.exports = router;
