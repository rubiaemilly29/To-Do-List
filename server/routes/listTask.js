const router = require('express').Router();
const listTaskControllers = require('../controllers/listTaskControllers'); 

router.post('/', listTaskControllers.create);

module.exports = router;
