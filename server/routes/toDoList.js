const toDoListRoutes = require('express').Router;

toDoListRoutes.get((_req, res) => {
res.status(200).json({ message: 'ola' });
});