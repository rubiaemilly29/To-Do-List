const router = require('express').Router();
const listTaskControllers = require('../controllers/listTaskControllers'); 

router.get('/', listTaskControllers.searchByAscendingCreationOrder);
router.get('/searchCreationOrder/descending', listTaskControllers.searchByDescendingCreationOrder);
router.get('/searchStatus/:status', listTaskControllers.searchByStatus);
router.get('/alphabeticalSearch/ascending', listTaskControllers.alphabeticalSearchAscending);
router.get('/alphabeticalSearch/descending', listTaskControllers.alphabeticalSearchDescending);

router.post('/', listTaskControllers.create);

router.put('/:id', listTaskControllers.updateList);

router.delete('/:id', listTaskControllers.deleteList);

module.exports = router;
