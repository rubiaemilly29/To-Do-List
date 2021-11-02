const router = require('express').Router();
const listTaskControllers = require('../controllers/listTaskControllers'); 

router.get('/creationOrder/ascending', listTaskControllers.searchByAscendingCreationOrder);
router.get('/creationOrder/descending', listTaskControllers.searchByDescendingCreationOrder);
router.get('/alphabeticalSearch/ascending', listTaskControllers.alphabeticalSearchAscending);
router.get('/alphabeticalSearch/descending', listTaskControllers.alphabeticalSearchDescending);
router.post('/', listTaskControllers.create);

module.exports = router;
