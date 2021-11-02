/* const { ObjectId } = require('mongodb'); */
const connection = require('../connection/conn');

const create = async (listTask) => {
  const { task, status } = listTask;
  const date = new Date();
  const db = await connection();
  const inserted = await db.collection('listTask').insertOne({ task, status, date });
  const { ops } = inserted;

  return { _id: inserted.insertedId, task, status, date: ops[0].date };
};

const getAll = async () => {
const db = await connection();
const allTask = await db.collection('listTask').find().toArray();
return allTask;
};

const searchByDescendingDate = async () => {
const db = await connection();
const allTask = await db.collection('listTask').find().sort({ date: -1 }).toArray();
return allTask;
};

const searchStatus = async (status) => {
const db = await connection();
const allTask = await db.collection('listTask').find({ status: `${status}` }).toArray();
return allTask;
};

module.exports = {
  create,
  getAll,
  searchByDescendingDate,
  searchStatus,
};
